/*
 * SPDX-FileCopyrightText: 2024 Contentful
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CmsTicketInterceptor } from './cms-ticket.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CmsTicketInterceptor,
    multi: true,
  },
];
