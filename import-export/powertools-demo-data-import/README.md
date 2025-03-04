# Contentful Content Import Instructions

Source: [Import Documentation](https://github.com/contentful/contentful-import/tree/main)

1. Inspect the `import-config.json`
2. Execute the following command: `contentful space import --config import-config.json`
3. Done

## Expected output

┌──────────────────────────────────────────────────┐
│ The following entities are going to be imported: │
├────────────────────────────────┬─────────────────┤
│ Content Types                  │ 16              │
├────────────────────────────────┼─────────────────┤
│ Tags                           │ 2               │
├────────────────────────────────┼─────────────────┤
│ Editor Interfaces              │ 16              │
├────────────────────────────────┼─────────────────┤
│ Entries                        │ 99              │
├────────────────────────────────┼─────────────────┤
│ Assets                         │ 41              │
├────────────────────────────────┼─────────────────┤
│ Locales                        │ 2               │
├────────────────────────────────┼─────────────────┤
│ Webhooks                       │ 0               │
└────────────────────────────────┴─────────────────┘
  ✔ Validating content-file
  ✔ Initialize client (1s)
  ✔ Checking if destination space already has any content and retrieving it (1s)
  ✔ Apply transformations to source data (1s)
  ✔ Push content to destination space
    ✔ Connecting to space (1s)
    ✔ Importing Locales (1s)
    ✔ Importing Content Types (3s)
    ✔ Publishing Content Types (7s)
    ✔ Importing Tags (1s)
    ✔ Importing Editor Interfaces (5s)
    ↓ Uploading Assets [skipped]
    ✔ Importing Assets (222s)
    ✔ Publishing Assets (13s)
    ✔ Archiving Assets (0s)
    ✔ Importing Content Entries (16s)
    ✔ Publishing Content Entries (38s)
    ✔ Archiving Entries (0s)
    ✔ Creating Web Hooks (0s)
Finished importing all data
┌────────────────────────┐
│ Imported entities      │
├───────────────────┬────┤
│ Locales           │ 2  │
├───────────────────┼────┤
│ Content Types     │ 16 │
├───────────────────┼────┤
│ Tags              │ 2  │
├───────────────────┼────┤
│ Editor Interfaces │ 16 │
├───────────────────┼────┤
│ Assets            │ 41 │
├───────────────────┼────┤
│ Published Assets  │ 41 │
├───────────────────┼────┤
│ Archived Assets   │ 0  │
├───────────────────┼────┤
│ Entries           │ 99 │
├───────────────────┼────┤
│ Published Entries │ 99 │
├───────────────────┼────┤
│ Archived Entries  │ 0  │
├───────────────────┼────┤
│ Webhooks          │ 0  │
└───────────────────┴────┘
The import took 5 minutes (301s)

The following 0 errors and 8 warnings occurred:

The import was successful.
