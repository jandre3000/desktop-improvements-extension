# MediaWiki Prototypes extension

A web extension that enables various prototype designs on Wikipedia.
To install this extension in Chrome for testing or development purposes,
first enable "developer mode" and "Load unpacked" from chrome://extensions/
Then run the build command and install the package from the `/packages/`
directory.

## Install

```
$ npm install
```

## Development

```
npm run dev chrome
npm run dev firefox
npm run dev opera
npm run dev edge
```
## Build

```
npm run build chrome
npm run build firefox
npm run build opera
npm run build edge
```

## Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts.

## Docs

Made with:
* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)
