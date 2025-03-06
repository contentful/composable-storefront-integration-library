# App data import

Source: [App installations Content Management API Reference](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/app-installations)

1. Inspect the `import-script.sh`
2. Configure the required properties
3. Copy data to the `flexfield-configuration-import.json` (Resulting JSON from the export script without the "sys" object)
4. Make the script executable by running `chmod +x import-script.sh`
5. Execute the script by running `./import-script.sh`
6. Verify the import by checking the Contentful App
