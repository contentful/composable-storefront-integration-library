/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FeatureModulesService, ScriptLoader } from '@spartacus/core';
import { ContentfulConfig } from '../config/contentful-config';
import { SMART_EDIT_FEATURE } from '../feature-name';

/**
 * The ContentfulLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
@Injectable({
  providedIn: 'root',
})
export class ContentfulLauncherService {
  protected readonly featureModulesService = inject(FeatureModulesService);
  private _cmsTicketId: string | undefined;

  get cmsTicketId(): string | undefined {
    return this._cmsTicketId;
  }

  constructor(
    protected config: ContentfulConfig,
    protected location: Location,
    protected scriptLoader: ScriptLoader
  ) {}

  /**
   * load webApplicationInjector.js first when Spartacus launched inside Contentful
   */
  load(): void {
    if (this.isLaunchedInContentful()) {
      this.featureModulesService.resolveFeature(SMART_EDIT_FEATURE).subscribe();

      this.scriptLoader?.embedScript({
        src: 'assets/webApplicationInjector.js',
        params: undefined,
        attributes: {
          id: 'text/contentful-injector',
          'data-contentful-allow-origin': this.config.contentful?.allowOrigin,
        },
      });
    }
  }

  /**
   * Indicates whether Spartacus is launched in Contentful
   */
  isLaunchedInContentful(): boolean {
    const path = this.location.path().split('?')[0];
    const params = this.location.path().split('?')[1];
    const cmsToken = params
      ?.split('&')
      .find((param) => param.startsWith('cmsTicketId='));
    this._cmsTicketId = cmsToken?.split('=')[1];

    return (
      path.split('/').pop() === this.config.contentful?.storefrontPreviewRoute &&
      !!this._cmsTicketId
    );
  }
}
