/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { contentfulDecorators } from './decorators';
import { ContentfulService } from './services/contentful.service';

@NgModule({
  providers: [...contentfulDecorators],
})
export class ContentfulCoreModule {
  constructor(private contentfulService: ContentfulService) {
    this.contentfulService.processCmsPage();
  }
}
