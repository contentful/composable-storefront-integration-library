# Contentful Content Export Instructions

Source: [Export Documentation](https://github.com/contentful/contentful-export)

1. Inspect the `export-config.json`
2. Execute the following command: `contentful space export --config export-config.json`
3. Done

## Expected output

   ✔ Initialize client (1s)
  ✔ Fetching data from space
    ✔ Connecting to space (1s)
    ✔ Fetching content types data (1s)
    ✔ Fetching tags data (1s)
    ✔ Fetching editor interfaces data (3s)
    ✔ Fetching content entries data (1s)
    ✔ Fetching assets data (1s)
    ✔ Fetching locales data (1s)
    ✔ Fetching webhooks data (1s)
    ✔ Fetching roles data (1s)
  ✔ Download assets (5s)
  ✔ Write export log file
    ✔ Lookup directory to store the logs
    ✔ Create log directory
    ✔ Writing data to file
┌────────────────────────┐
│ Exported entities      │
├───────────────────┬────┤
│ Content Types     │ 16 │
├───────────────────┼────┤
│ Tags              │ 2  │
├───────────────────┼────┤
│ Editor Interfaces │ 16 │
├───────────────────┼────┤
│ Entries           │ 99 │
├───────────────────┼────┤
│ Assets            │ 41 │
├───────────────────┼────┤
│ Locales           │ 2  │
├───────────────────┼────┤
│ Webhooks          │ 0  │
├───────────────────┼────┤
│ Roles             │ 4  │
└───────────────────┴────┘
┌─────────────────────────────┐
│ Asset file download results │
├──────────────────┬──────────┤
│ Successful       │ 81       │
├──────────────────┼──────────┤
│ Warnings         │ 0        │
├──────────────────┼──────────┤
│ Errors           │ 0        │
└──────────────────┴──────────┘
The export took less than a minute (9s)

Stored space data to json file at: /Users/.../.../.../powertools-demo-data-export/export-data/export-data.json

The following 0 errors and 6 warnings occurred:

The export was successful.
✨ Done
