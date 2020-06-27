# \<fleshy-jsoneditor>

[![GitHub version](https://badge.fury.io/gh/trystan2k%2Ffleshy-jsoneditor.svg)](https://badge.fury.io/gh/trystan2k%2Ffleshy-jsoneditor)

[![Build](https://github.com/trystan2k/fleshy-jsoneditor/workflows/Build-CI/badge.svg)](https://github.com/trystan2k/fleshy-jsoneditor/actions)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ec50add2-cd3d-403b-97c8-886c658803f2/deploy-status)](https://fleshy-jsoneditor.netlify.app)

LitElement custom element that wraps [josdejong/jsoneditor](http://github.com/josdejong/jsoneditor).

It is an updated version of [juicy-jsoneditor](https://github.com/Juicy/juicy-jsoneditor)

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Demo

[Check it live!](https://fleshy-jsoneditor.netlify.app/)

## Installation

```bash
npm i @trystan2k/fleshy-jsoneditor@latest
```

## Usage

```html
<script type="module">
  import '@trystan2k/fleshy-jsoneditor/fleshy-jsoneditor.js';
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

## Release

To release a new version, once all PRs were merged into `master`, it is just necessary to execute:

```bash
npm run release
```

This script will generate new tag, update version in package.json and update changelog file with latest changes.

Once finish, it is just necessary to push the new commit to master. You can do it manually (but remember to push the tags also)
or use the script

```bash
npm run push
```

Once the origin master branch is updated, a GitHubAction will take care of it. It will deploy the storybook in Netlify and publish the package in NPM.
