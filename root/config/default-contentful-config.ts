import { ContentfulConfig } from './contentful-config';

export const defaultContentfulConfig: ContentfulConfig = {
  contentful: {
    spaceId: '',
    accessToken: '',
    previewAccessToken: '',
    environment: 'master',
    deliveryApiUrl: 'cdn.contentful.com',
    previewApiUrl: 'preview.contentful.com',
  },
};
