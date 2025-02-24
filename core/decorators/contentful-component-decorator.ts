/*
 * SPDX-FileCopyrightText: 2024 Contentful
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Renderer2 } from '@angular/core';
import { ComponentDecorator, ContentSlotComponentData } from '@spartacus/core';
import { ContentfulService } from '../services/contentful.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulComponentDecorator extends ComponentDecorator {
  constructor(protected contentfulService: ContentfulService) {
    super();
  }

  decorate(
    element: Element,
    renderer: Renderer2,
    component: ContentSlotComponentData
  ): void {
    if (component) {
      this.contentfulService.addContentfulContract(
        element,
        renderer,
        component.properties
      );
    }
  }
}
