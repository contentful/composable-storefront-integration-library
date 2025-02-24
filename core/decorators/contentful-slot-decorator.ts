/*
 * SPDX-FileCopyrightText: 2024 Contentful
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Renderer2 } from '@angular/core';
import { ContentSlotData, SlotDecorator } from '@spartacus/core';
import { ContentfulService } from '../services/contentful.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulSlotDecorator extends SlotDecorator {
  constructor(protected contentfulService: ContentfulService) {
    super();
  }

  decorate(element: Element, renderer: Renderer2, slot: ContentSlotData): void {
    if (slot) {
      this.contentfulService.addContentfulContract(
        element,
        renderer,
        slot.properties
      );
    }
  }
}
