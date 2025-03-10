# Getting started - Demo setup

The goal of this section is to show you how to set up your environment and copy the integration code in order to try out  
the Contentful and Composable Storefront Powertools Store demo. Each step will:

- Describe the required actions
- Provide links to the official documentation from Contentful or SAP
- Show an example of the expected output so you can verify that the step is completed.

The assumption is that you will be starting with none of the required tools and applications set up, however, if you  
already have an SAP Commerce or a Contentful instance set up, feel free to skip some steps as long as you can verify  
that what you have matches the expected output for that particular section.

Before we begin the specifics of the integration between Contentful and Composable storefront, we would like to get to a state where we have both of those products installed, configured and working independently.

## SAP Commerce Cloud Setup

Since we will be using SAP Composable Storefront and one of the SAP’s default storefronts for product information  
(Powertools Store), we need to have an SAP Commerce setup and initialize it with proper data.

We can do this in two ways:

1.  Download and install a local copy of SAP Commerce Cloud 2211
2.  Use an existing instance of SAP Commerce Cloud 2211 deployed on Commerce Cloud V2

### Installing a local copy of Commerce Cloud 2211

In order to correctly install Commerce Cloud 2211 on your local machine and initialize it with the Powertools Store data,  
please follow the official documentation found here:

[Installing SAP Commerce Cloud 2211 for use with Composable Storefront](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/cfcf687ce2544bba9799aa6c8314ecd0/6a04941777e242508bdd1dc395a15553.html?locale=en-US&version=2211)

### Using an existing instance of Commerce Cloud 2211 in CCV

If you already have an instance of SAP Commerce Cloud deployed in SAP CCV2 cloud solution, you will have to set up  
additional HTTP response headers in order to let Contentful host the store website in an iframe when using the Live  
Preview functionality.

**Setting up additional HTTP response headers in order to use Live Preview**  
You can find the required headers in the official Contentful Live Preview setup guide:

[Contentful - Live Preview Setup](https://www.contentful.com/developers/docs/tutorials/preview/live-preview/#:~:text=preview%20SDK.-,Setup,-To%20set%20up)

Refer to the official SAP documentation on how to add HTTP Response header sets:

[SAP Commerce Cloud in the Public Cloud - Creating an HTTP Response Header Set](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/0fa6bcf4736c46f78c248512391eb467/8d01a3a3c24c4971b5d8f5954ebae714.html?q=headers&version=v2211&locale=en-US)

At the time of writing, headers that need to be set up under **Security > HTTP Response Header Sets** in order for Live  
Preview to work are the following:

- **Header Name:** `Content-Security-Policy`
- **Header Value:** `frame-ancestors 'self' https://app.contentful.com`
- **Apply Condition:** `ALWAYS`
- **Apply Action:** `SET`

and:

- **Header Name:** `X-Frame-Options`
- **Header Value:**   ` `
- **Apply Condition:** `ALWAYS`
- **Apply Action:** `UNSET`

After you create a set containing these headers, you will have to assign the newly created set to the **JS Storefront**  
endpoint, please follow the official SAP documentation in order to achieve this:

[SAP Commerce Cloud in the Public Cloud - Assigning an HTTP Response Header Set to an Endpoint](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/0fa6bcf4736c46f78c248512391eb467/1af7f528f1864e17b8d256704556b5d4.html?q=headers&version=v2211&locale=en-US)

### Verifying the installation of SAP Commerce Cloud 2211

After you install your SAP Commerce Cloud 2211 instance, make sure to have access to the following resources:

1.  SAP Commerce Backoffice  
    a. For local instances, you can access the Backoffice at https://localhost:9002/backoffice/  
    b. For CCV2 instances, you can find the Backoffice endpoint at **Environments > \[environment\] > Public**  
    **Endpoints > Backoffice**  
    ![Screenshot 2025-01-30 at 07.34.16.png](./resources/Screenshot%202025-01-30%20at%2007.34.16.png)
    
2.  powertools-spa website within the **WCMS > Website** section of the Backoffice:  
    ![Screenshot 2025-01-30 at 07.34.50.png](./resources/Screenshot%202025-01-30%20at%2007.34.50.png)
    

## SAP Composable Storefront Setup

**Note:** *For the purposes of this demo, we are using the Powertools SPA store which is a B2B store and in order to enable  
additional functionality such as adding products to cart and creating orders, additional configuration is needed, but for  
now the scope is narrowed down to a homepage and faq page experience and in order to keep the flow simple we will  
keep the default configuration from the SAP Composable Storefront installation documentation. Later, expanded versions  
of this guide will tackle the rest of the functionalities of this B2B store.*

Installing a Composable Storefront Angular application should be done by following the official SAP documentation:

[Building the Composable Storefront From Libraries](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/cfcf687ce2544bba9799aa6c8314ecd0/5de67850bd8d487181fef9c9ba59a31d.html?locale=en-US&version=2211)

After installing the libraries and running the application you should be greeted with the ability to access two SAP B2C  
stores: `electronics-spa` and `apparel-uk-spa`.

![Screenshot 2025-01-30 at 09.49.28.png](./resources/Screenshot%202025-01-30%20at%2009.49.28.png)

![Screenshot 2025-01-30 at 09.49.50.png](./resources/Screenshot%202025-01-30%20at%2009.49.50.png)

In order to gain access to the Powertools SPA store, that we will be using for the integration demo, you have to edit the  
`src/app/spartacus/spartacus-configuration.module.ts` file and change the existing context configuration:

```js
provideConfig(<SiteContextConfig>{
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      baseSite: ['electronics-spa','apparel-uk-spa'],
      currency: ['USD', 'GBP',]},
})
```

to the following:

```js
provideConfig(<SiteContextConfig>{
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      baseSite: ['powertools-spa'],
      currency: ['USD', 'EUR'],
      language: ['en', 'de'],},
})
```

In the current version of Composable Storefront, the "my-account" translations are not automatically provided in the  
default setup. This may be a temporary issue, but you can manually fix it by modifying the i18n configuration.

```js
provideDefaultConfig(<I18nConfig>{
  i18n: {
    resources: translations,
    chunks: translationChunksConfig,
    fallbackLang: 'en',
  },
}),
```

to the following:

```js
provideDefaultConfig(<I18nConfig>{
  i18n: {
    resources: translations,
    chunks: {
      ...translationChunksConfig,
      myAccount: ['closeAccount', 'updatePasswordForm', 'updateProfileForm', 'consentManagementForm', 'myCoupons', 'notificationPreference', 'myInterests'],
    },
    fallbackLang: 'en',
  },
}),
```

And after the application reload, you will be able to access the Powertools SPA store.

![Screenshot 2025-01-30 at 10.04.30.png](./resources/Screenshot%202025-01-30%20at%2010.04.30.png)

Additionally, you should edit `package.json` file’s `start` script to make sure that the app starts in ssl mode:  
`"start": "ng serve --ssl"`

Now, your Powertools SPA store should be available at:  
`https://localhost:4200/powertools-spa/en/USD/`

### Using the example code provided in the repository

If you wish to get to the demo functionality as quickly as possible, we have prepared a demo repository with the sample  
code and the integration already in place.

1.  Checkout the code in `contentful-spartacus-demo-app` folder
2.  Place your [SAP RBSC key](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/cfcf687ce2544bba9799aa6c8314ecd0/5de67850bd8d487181fef9c9ba59a31d.html?locale=en-US#installing-composable-storefront-libraries-from-the-repository-based-shipment-channel) in the `.npmrc` file
3.  Edit the `src/app/contentful/root/config/default-contentful-config.ts` and add the required configuration  
    a. Space Id  
    b. Access Token  
    (described in [Setting up the Contentful Access Tokens](#setting-up-the-contentful-access-tokens) )  
    c. Preview Token  
    (described in [Setting up the Contentful Access Tokens](#setting-up-the-contentful-access-tokens) )
4.  Make sure that `src/app/spartacus/spartacus-configuration.module.ts` has `baseUrl` property that points to the API of  
    your instance of Commerce Cloud.
5.  Run `npm install`
6.  Run `npm start`  
    If you’ve gone through the Contentful setup as described in the rest of this guide, the Powertools store that reflects the  
    Contentful Content Model and Content should be available at  
    `https://localhost:4200/powertools-spa/en/USD/`

## Contentful Setup

You will also need a Contentful Space for importing the content data we prepared for this demo. Simply by signing up  
with Contentful you will receive a single Space and access to everything that you need in order to get started.  
For additional info we recommend the official docs:

[Beginner's guide to Contentful](https://www.contentful.com/help/getting-started/contentful-101/)

![Screenshot 2025-01-30 at 10.15.07.png](./resources/Screenshot%202025-01-30%20at%2010.15.07.png)

In order to set up Contentful for use with this demo, you will have to set up a couple of access tokens, import content  
model and content that we have prepared, install a couple of [Contentful Marketplace Apps](https://www.contentful.com/help/apps/), set up the localization options and the content preview platform for the Live Preview.

### Setting up the Contentful Access Tokens

In order to successfully import the data that we have prepared and later connect to the Composable Storefront  
application, you will have to create the following tokens as described in the official documentation [Authentication](https://www.contentful.com/developers/docs/references/authentication/):

- [Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/) key. This key will be used during the data import.
- [Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) and [Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/) tokens. These tokens will be used in the Composable Storefront application in order to fetch the content and during the Live Preview to fetch the edited content.

### Integration Demo Data Import

We have provided a set of data that has been exported from an existing Integration Demo space.  
In order to import data:

1.  Set up the Space localization to `en`  
    Default localization for a new Space is usually `en-US`, but for the data that we are importing we specifically need it to  
    be `en`  
    Check the official docs on how to change the localization of the space: [Manage locales](https://www.contentful.com/help/localization/manage-locales/)
    
2.  Extract the provided import files on your local machine and navigate to the  
    `powertools-demo-data-import` folder. The folder should have the following structure:
    
    ```bash
    powertools-demo-data-import/
    ├─ import-data/
    │  ├─ images.ctfassets.net/
    │  │  ├─ .../
    │  │  ├─ .../
    │  │  ├─ .../
    │  ├─ import-data.json
    ├─ import-config.json
    ├─ README.md
    ```
    
    Configure the `import-config.json` file by adding your:
    
    1.  Space ID
    2.  Environment ID ('master' will be used if left empty)
    3.  Content Management API key (as described in [Setting up the Contentful Access Tokens](#setting-up-the-contentful-access-tokens))
3.  Open the `powertools-demo-data-import` folder in your terminal
    
4.  Follow the instructions from the [Importing and exporting content with the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/) in order to install  
    contentful library and authenticate
    
5.  Execute the following import command:  
    `contentful space import --config import-config.json`
    

You should expect the following output:

```bash
┌──────────────────────────────────────────────────┐
│ The following entities are going to be imported: │
├────────────────────────────────┬─────────────────┤
│ Content Types                  │ 25              │
├────────────────────────────────┼─────────────────┤
│ Tags                           │ 7               │
├────────────────────────────────┼─────────────────┤
│ Editor Interfaces              │ 25              │
├────────────────────────────────┼─────────────────┤
│ Entries                        │ 332             │
├────────────────────────────────┼─────────────────┤
│ Assets                         │ 50              │
├────────────────────────────────┼─────────────────┤
│ Locales                        │ 2               │
├────────────────────────────────┼─────────────────┤
│ Webhooks                       │ 0               │
└────────────────────────────────┴─────────────────┘
  ✔ Validating content-file
  ✔ Initialize client (1s)
  ✔ Checking if destination space already has any content and retrieving it (2s)
  ✔ Apply transformations to source data (1s)
  ✔ Push content to destination space
    ✔ Connecting to space (1s)
    ✔ Importing Locales (1s)
    ✔ Importing Content Types (4s)
    ✔ Publishing Content Types (12s)
    ✔ Importing Tags (2s)
    ✔ Importing Editor Interfaces (8s)
    ↓ Uploading Assets [skipped]
    ✔ Importing Assets (264s)
    ✔ Publishing Assets (16s)
    ✔ Archiving Assets (1s)
    ✔ Importing Content Entries (48s)
    ✔ Publishing Content Entries (129s)
    ✔ Archiving Entries (0s)
    ✔ Creating Web Hooks (1s)
Finished importing all data
┌─────────────────────────┐
│ Imported entities       │
├───────────────────┬─────┤
│ Locales           │ 2   │
├───────────────────┼─────┤
│ Content Types     │ 25  │
├───────────────────┼─────┤
│ Tags              │ 7   │
├───────────────────┼─────┤
│ Editor Interfaces │ 25  │
├───────────────────┼─────┤
│ Assets            │ 50  │
├───────────────────┼─────┤
│ Published Assets  │ 50  │
├───────────────────┼─────┤
│ Archived Assets   │ 0   │
├───────────────────┼─────┤
│ Entries           │ 332 │
├───────────────────┼─────┤
│ Published Entries │ 332 │
├───────────────────┼─────┤
│ Archived Entries  │ 0   │
├───────────────────┼─────┤
│ Webhooks          │ 0   │
└───────────────────┴─────┘
The import took 8 minutes (480s)

The import was successful.
```

After refreshing your Contentful page, you should see the imported Content Model and Content:

![Screenshot 2025-01-30 at 12.31.48.png](./resources/Screenshot%202025-01-30%20at%2012.31.48.png)

### Marketplace App - Contentful Connector for SAP Commerce Cloud

In order to choose the products that we want displayed in the carousel component on the homepage, we need an official  
SAP Commerce Cloud connector which will make it easier to browse and select the products from our Commerce Cloud  
2211 instance.

![Screenshot 2025-01-30 at 11.43.09.png](./resources/Screenshot%202025-01-30%20at%2011.43.09.png)

Without installing the app, in the Best Selling Products carousel component, you should be seeing something similar to  
this:

![Screenshot 2025-01-30 at 13.06.30.png](./resources/Screenshot%202025-01-30%20at%2013.06.30.png)

On your Contentful web page go to the **Apps > Marketplace** , then find and install the Contentful Connector for SAP  
Commerce Cloud app.

![Screenshot 2025-01-30 at 13.13.01.png](./resources/Screenshot%202025-01-30%20at%2013.13.01.png)

In order to install, you will have to:

- Provide API endpoint
    - For CCV2 Commerce instances, it can be found in the CCV2 panel under  
        **Environments > \[environment\] > Public Endpoints > API**
    - For locally installed Commerce instance, you can use the following value:  
        `https://localhost:9002`
- Select the proper fields to connect:  
    **Product Carousel > Products**

After installing the app, you should be able to add new products to the Product Carousel component.

![Screenshot 2025-01-30 at 13.02.02.png](./resources/Screenshot%202025-01-30%20at%2013.02.02.png)

You should be seeing Select Products button and after clicking it, you should see all the products for the selected store  
available for selection.

![Screenshot 2025-01-30 at 13.02.11.png](./resources/Screenshot%202025-01-30%20at%2013.02.11.png)

**Note:** *The app is using the URLs to find the data in the Commerce Cloud instance. We have provided data that relies on  
the local installation of Cloud Commerce but if you’re providing a CCV2 instance data, or it runs on a different port in your  
local system, the imported url links might not match your environment, thus you would have to reimport the products to  
get the app to show product name and picture in the Contentful UI. The imported links should still work in the component  
itself because the product id data is what is being parsed and that should match the powertools-spa initialization data.*

### Marketplace App - Flex Fields

Another marketplace app that will be useful to us is Flex Fields.

This app will enable us to conditionally show what page sections are available during page creation. You can read more  
about this in the Content Architecture documentation.

![Screenshot 2025-01-30 at 13.16.54.png](./resources/Screenshot%202025-01-30%20at%2013.16.54.png)

Before the installation (and, more importantly, configuration) of the Flex Fields, when you are creating or viewing a  
`CMSPage` entry, you will have all page sections available regardless of the template the page is based upon. This can get  
quite chaotic in time with more templates and different section naming schemes, this is why we will import FlexFields  
rules in order to show only the needed page sections.

**Note:** *During the installation of the FlexFields app you might have to add a random rule in order for the app to let you  
proceed with the installation, you can delete the rule as soon as the installation is confirmed.*

![Screenshot 2025-01-30 at 13.23.26.png](./resources/Screenshot%202025-01-30%20at%2013.23.26.png)

In order to import the prepared rules for FlexFields, you should execute the script that we have provided with the Demo  
Sample Data, in the folder `flexfields-demo-data-import`.

Within the script itself you will have to configure the required properties:

1.  Space ID (SPACEID)
2.  Content Management API Token (CMATOKEN) (as described in [Setting up the Contentful Access Tokens](#setting-up-the-contentful-access-tokens))
3.  App Installaion ID (APPINSTALLATION) should remain as provided, since every Marketplace App provides their own  
    unique ID on the app installation info page  
    ![Screenshot 2025-02-03 at 15.50.32.png](./resources/Screenshot%202025-02-03%20at%2015.50.32.png)

After executing the script you will be seeing three rules configured for the FlexFields app.  
![Screenshot 2025-01-30 at 13.36.45.png](./resources/Screenshot%202025-01-30%20at%2013.36.45.png)

**Note:** *After import of the FlexFields rules you might have to go into FlexFields Configuration and click Save and reload  
the Contentful web app in order to update the UI components properly and activate the rules.*

After you import the rules, creating a CMSPage with template ContentPage1Template will now hide all the page sections  
that are not used by that specific template.

![Screenshot 2025-01-30 at 13.41.28.png](./resources/Screenshot%202025-01-30%20at%2013.41.28.png)

### Check content localization

Demo data that we have provided has two locales: `en` for English and `de` for German language. After the import, you  
should be able to set up localized versions of content, but in order to see these options you will have to check the  
additional locale in the Web UI:

1.  Open the `Homepage` `CMSPage` content
    
2.  On the right side you should be seeing `Locales list` and the button `Edit locales list`  
    ![Screenshot 2025-02-02 at 21.27.52.png](./resources/Screenshot%202025-02-02%20at%2021.27.52.png)
    
3.  After clicking the button you should be able to add the German language locale to the list  
    ![Screenshot 2025-02-02 at 21.27.59.png](./resources/Screenshot%202025-02-02%20at%2021.27.59.png)
    
4.  You should now see the input fields for all the fields that have a German localization  
    ![Screenshot 2025-02-02 at 21.28.46.png](./resources/Screenshot%202025-02-02%20at%2021.28.46.png)
    

### Content preview platform for the Live Preview

Once we set up the integration between Composable Storefront and Contentful you will be able to access Live Preview  
functionality directly from the Contentfull app, but you will have to set up the Content Preview settings.

Follow the official documentation [Set up content preview](https://www.contentful.com/developers/docs/tutorials/preview/content-preview/) and set up the live preview URL as follows:

- Content types: `CMS Page`
- Preview URL: `https://localhost:4200/powertools-spa/{locale}/USD/{entry.fields.previewUrl}?preview=true`

And then you should be seeing an `Open Live Preview` button for the platform you’ve created. This will become useful  
after the integration code is copied and installed in the next chapter.

![Screenshot 2025-02-02 at 21.44.27.png](./resources/Screenshot%202025-02-02%20at%2021.44.27.png)

## Contentful and Composable Storefront Integration code

In the repository we provided you will find the Composable Storefront Angular code that will be used to connect the  
Composable Storefront + Commerce Cloud to our Contentful instance.

The code that we provided should have the following structure:

```bash
contentful/
├── assets
│   └── translations
│       ├── de
│       │   ├── index.ts
│       │   ├── order.json
│       │   └── product.json
│       ├── en
│       │   ├── index.ts
│       │   ├── order.json
│       │   └── product.json
│       └── translations.ts
├── cms
│   ├── adapters
│   │   ├── contentful-cms-component.adapter.ts
│   │   ├── contentful-cms-component-adpater.spec.ts
│   │   ├── contentful-cms-page-adapter.spec.ts
│   │   ├── contentful-cms-page.adapter.ts
│   │   └── converters
│   │       ├── components
│   │       │   ├── contentful-cms-banner-component-normalizer.spec.ts
│   │       │   ├── contentful-cms-banner-component-normalizer.ts
│   │       │   ├── contentful-cms-navigation-component-normalizer.spec.ts
│   │       │   ├── contentful-cms-navigation-component-normalizer.ts
│   │       │   ├── contentful-cms-product-carousel-component-normalizer.spec.ts
│   │       │   └── contentful-cms-product-carousel-component-normalizer.ts
│   │       ├── contentful-cms-component-normalizer.spec.ts
│   │       ├── contentful-cms-component-normalizer.ts
│   │       ├── contentful-cms-page-normalizer.spec.ts
│   │       └── contentful-cms-page-normalizer.ts
│   └── contentful-cms.module.ts
├── contentful.module.ts
├── core
│   ├── contentful-core.module.ts
│   ├── content-types.ts
│   ├── decorators
│   │   ├── contentful-component-decorator.spec.ts
│   │   ├── contentful-component-decorator.ts
│   │   └── index.ts
│   ├── helpers.ts
│   ├── public_api.ts
│   ├── services
│   │   ├── contentful-angular.service.spec.ts
│   │   ├── contentful-angular.service.ts
│   │   ├── contentful-live-preview.service.spec.ts
│   │   ├── contentful-live-preview.service.ts
│   │   ├── contentful-restrictions.service.spec.ts
│   │   ├── contentful-restrictions.service.ts
│   │   └── contentful.service.ts
│   ├── type-guards.spec.ts
│   └── type-guards.ts
└── root
    ├── config
    │   ├── contentful-config.ts
    │   └── default-contentful-config.ts
    ├── contentful-root.module.ts
    ├── feature-name.ts
    ├── index.ts
    └── public_api.ts
```

In order to integrate Composable Storefront and Contentful you will need to:

1.  Install the contentful libraries within your Composable Storefront Angular app  
    `npm install contentful @contentful/live-preview`
    
2.  Copy the `contentful` folder from the provided codebase to the `src/app` folder within your Composable Storefront  
    Angular app
    
3.  Copy the `spartacus/features/contentful/contentful-cms-feature.module.ts` module file to the  
    `src/app/spartacus/features/contentful/` folder within your Composable Storefront Angular app
    
4.  Add the `ContentfulCMSFeatureModule` to the imports array of the src/app/spartacus/features/spartacus-  
    features.module.ts:
    
    ```js
    import { NgModule } from '@angular/core';
    // ... other imports
    import { ContentfulCMSFeatureModule } from './features/contentful/contentful-cms-feature.module';
    
    @NgModule({
      declarations: [],
      imports: [
        AuthModule.forRoot(),
        // .. other imports
        ProductVariantsFeatureModule,
        ProductImageZoomFeatureModule,
        ContentfulCMSFeatureModule,
      ],
      providers: [provideFeatureToggles({
        "showDeliveryOptionsTranslation": true,
        //... other feature toggles
      })]
    })
    export class SpartacusFeaturesModule { }
     	
    ```
    
5.  Provide the correct configuration in the `src/app/spartacus/spartacus-configuration.module.ts` file.
    
    - Fill in `YOUR_SPACE_ID`, `YOUR_ACCESS_TOKEN`, `YOUR_PREVIEW_ACCESS_ID` and `YOUR_ENVIRONMENT`  
        **Note:** *You should’ve created accessToken and previewToken (Content Delivery and Content Preview) during the Contentful setup, as described in [Setting up the Contentful Access Tokens](#setting-up-the-contentful-access-tokens)*
    - Add the slug map  
        In Composable Storefront, pages with dynamic paths (e.g., Order Details pages) include a page ID in the URL. To fetch the correct page from Contentful, a slug map is used to match the dynamic page paths to their corresponding slugs. You can extend the slug mapping configuration by adding custom mappings for your own dynamic pages. This allows you to correctly fetch pages from Contentful that follow a unique URL pattern.
    
    ```js
    provideConfig(<ContentfulConfig>{
      contentful: {
        spaceId: {{YOUR_SPACE_ID}},
        accessToken: {{YOUR_ACCESS_TOKEN}},
        previewAccessToken: {{YOUR_PREVIEW_ACCESS_ID}},
        environment: {{YOUR_ENVIRONMENT}},
        deliveryApiUrl: 'cdn.contentful.com',
        previewApiUrl: 'preview.contentful.com',
        slugMapping: {
          '^organization/units/[a-zA-Z0-9]+$': 'organization/units',
          '^organization/account-summary/details/[a-zA-Z0-9]+$': 'organization/account-summary/details',
          '^my-account/saved-cart/[a-zA-Z0-9]+$': 'my-account/saved-cart',
          '^my-account/order/[a-zA-Z0-9]+$': 'my-account/order',
          '^my-account/order/cancel/confirmation/[a-zA-Z0-9]+$': 'my-account/order/cancel/confirmation',
          '^my-account/order/cancel/[a-zA-Z0-9]+$': 'my-account/order/cancel',
          '^my-account/support-ticket/[a-zA-Z0-9]+$': 'my-account/support-ticket',
          '^my-account/unitLevelOrderDetails/[a-zA-Z0-9]+$': 'my-account/unitLevelOrderDetails',
          '^my-account/order/return/confirmation/[a-zA-Z0-9]+$': 'my-account/order/return/confirmation',
          '^my-account/order/return/[a-zA-Z0-9]+$': 'my-account/order/return',
          '^my-account/return-request/[a-zA-Z0-9]+$': 'my-account/return-request',
          '^my-account/quote/[a-zA-Z0-9]+$': 'my-account/quote',
        },
      },
    }),
    ```
    
6.  Run the app using  
    `npm start`
    
7.  Verify that you still see the Powertools Homepage at:  
    `https://localhost:4200/powertools-spa/en/USD/`
    
8.  Only the homepage and faq/help page should be accessible with this demo, other pages and shop functionality should  
    follow soon as the demo gets expanded
    

## Verifying Demo Setup outcome

In this section we will go through a couple of basic usecases to confirm that the demo setup has been completed  
successfully.

### Updating Content Model

We will be updating the footer paragraph that contains copyright information by updating the year:

![Screenshot 2025-01-31 at 09.59.29.png](./resources/Screenshot%202025-01-31%20at%2009.59.29.png)

Navigate to your Contentful space, browse the content and find the Notice Text Paragraph component.

![Screenshot 2025-01-31 at 10.01.43.png](./resources/Screenshot%202025-01-31%20at%2010.01.43.png)

Edit the component’s Content field, change the year from 2024 to 2025 and hit Publish changes.

![Screenshot 2025-01-31 at 10.02.03.png](./resources/Screenshot%202025-01-31%20at%2010.02.03.png)

Return to the store page and hit refresh and the new copyright text should be there.

![Screenshot 2025-01-31 at 10.04.31.png](./resources/Screenshot%202025-01-31%20at%2010.04.31.png)

### Using Live Preview

Navigate to your Contentful space, browse the content and find the Homepage CMSPage.

![Screenshot 2025-01-31 at 10.06.31.png](./resources/Screenshot%202025-01-31%20at%2010.06.31.png)

Open the page and click on the Live preview button. A new overlay structure will appear with the page data on the left  
and the preview window on the right.

![Screenshot 2025-02-02 at 21.50.52.png](./resources/Screenshot%202025-02-02%20at%2021.50.52.png)

Click on the green i on the top right corner of the page and confirm that:

- Inspector Mode is on - this means that all of the components on the page will have an outline around them and you  
    can click on the corresponding Edit button to quickly jump to the properties of that particular component
    
- Live Updated is on - this means that the changes will be visible as soon as you make them on the component  
    ![Screenshot 2025-02-02 at 21.50.58.png](./resources/Screenshot%202025-02-02%20at%2021.50.58.png)
    

Hover one of the product carousels and click the Edit button that shows above them, the component properties will be  
shown on the left side of the Live Preview window. This is the Inspector Mode feature of the Live Preview.

![Screenshot 2025-02-02 at 21.57.29.png](./resources/Screenshot%202025-02-02%20at%2021.57.29.png)

In the products field, rearrange the positions of the produtcts, swap the first and the second products by dragging one in  
front of the other and observe the instant change that occurs on the preview page. This is the Live updates functionality  
of the Live Preview.

![Screenshot 2025-02-02 at 21.54.49.png](./resources/Screenshot%202025-02-02%20at%2021.54.49.png)

If you wish, you can click Publish and publish the changes that you’ve created so that they are visible when visiting the  
page directly at `https://localhost:4200/powertools-spa/en/USD/`
