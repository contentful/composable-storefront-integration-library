/*
 * SPDX-FileCopyrightText: 2024 Contentful
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ContentfulConfig {
  contentful?: {
    storefrontPreviewRoute?: string;
    allowOrigin?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends ContentfulConfig {}
}
