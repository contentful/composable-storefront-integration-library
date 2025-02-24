/*
 * SPDX-FileCopyrightText: 2024 Contentful
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { ComponentDecorator, SlotDecorator } from '@spartacus/core';
import { ContentfulComponentDecorator } from './contentful-component-decorator';
import { ContentfulSlotDecorator } from './contentful-slot-decorator';

export const contentfulDecorators: Provider[] = [
  {
    provide: ComponentDecorator,
    useExisting: ContentfulComponentDecorator,
    multi: true,
  },
  {
    provide: SlotDecorator,
    useExisting: ContentfulSlotDecorator,
    multi: true,
  },
];
