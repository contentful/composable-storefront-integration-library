/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultContentfulConfig } from './config/default-contentful-config';
import { interceptors } from './http-interceptors/index';
import { ContentfulLauncherService } from './services/contentful-launcher.service';

export function contentfulFactory(
  contentfulLauncherService: ContentfulLauncherService
): () => void {
  const isReady = () => {
    contentfulLauncherService.load();
  };
  return isReady;
}

@NgModule({
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultContentfulConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: contentfulFactory,
      deps: [ContentfulLauncherService],
      multi: true,
    },
  ],
})
export class ContentfulRootModule {}
