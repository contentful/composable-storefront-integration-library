/*
 * SPDX-FileCopyrightText: 2024 Contentful
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContentfulConfig } from './contentful-config';

export const defaultContentfulConfig: ContentfulConfig = {
  contentful: {
    storefrontPreviewRoute: 'cx-preview',
    allowOrigin: 'localhost:9002',
  },
};
