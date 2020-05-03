# \<fleshy-jsoneditor>

![](https://github.com/trystan2k/fleshy-jsoneditor/workflows/Build-CI/badge.svg)

LitElement custom element that wraps [josdejong/jsoneditor](http://github.com/josdejong/jsoneditor). 

It is an updated version of [juicy-jsoneditor](https://github.com/Juicy/juicy-jsoneditor)

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i fleshy-jsoneditor
```

## Usage
```html
<script type="module">
  import 'fleshy-jsoneditor/fleshy-jsoneditor.js';
</script>

<fleshy-jsoneditor></fleshy-jsoneditor>
```

## Development
It uses [josdejong/jsoneditor](http://github.com/josdejong/jsoneditor) as devDependency, as jsoneditor does not export a ES module. So, for build, it is necessary primary to use rollup and generate jsoneditor files with ES module exports. It also copy some style and svg files, as it needs them to render the editor.

To update the files (located in /lib folder), run
```bash
npm run build-deps
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
