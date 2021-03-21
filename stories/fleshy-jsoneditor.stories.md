<!-- markdownlint-disable MD033 -->

# Demo for fleshy-jsoneditor

```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';
import '../fleshy-jsoneditor.js';

export default {
  title: 'Demo fleshy-jsoneditor',
  component: 'fleshy-jsoneditor',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
  options: { selectedPanel: 'storybookjs/knobs/panel' },
};
```

LitElement custom element that wraps [josdejong/jsoneditor](http://github.com/josdejong/jsoneditor).

It is an updated version of [juicy-jsoneditor](https://github.com/Juicy/juicy-jsoneditor)

## How to use

### Installation

- With Yarn

```bash
yarn add fleshy-jsoneditor
```

- With NPM

```bash
npm i fleshy-jsoneditor
```

```js
import 'fleshy-jsoneditor/fleshy-jsoneditor.js';
```

```js preview-story
const json = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: 123,
  object: { a: 'b', c: 'd' },
  string: 'Hello World',
};
export const Simple = () => html`
  <fleshy-jsoneditor .json="${json}"></fleshy-jsoneditor>
`;
```

## API

<sb-props of="fleshy-jsoneditor"></sb-props>

## Playground

For each story you see here you have a menu point on the left.
Click on canvas and then knobs to see and modify the public api.

## Variations

### With `name` attribute

```js preview-story
export const NameAttribute = () => html`
  <fleshy-jsoneditor .json=${json} name="MyName"></fleshy-jsoneditor>
`;
```

### With `modes` attribute

```js preview-story
const modes = ['code', 'form', 'text', 'tree', 'view'];
export const ModesAttribute = () => html`
  <fleshy-jsoneditor .json=${json} .modes="${modes}"></fleshy-jsoneditor>
`;
```

### With `search` attribute set to `true`

```js preview-story
export const SearchAttribute = () => html`
  <fleshy-jsoneditor .json=${json} search></fleshy-jsoneditor>
`;
```

### With `mode` attribute

```js preview-story
export const ModeAttribute = () => html`
  <fleshy-jsoneditor .json=${json} mode="text"></fleshy-jsoneditor>
`;
```

### With `indentation` attribute

```js preview-story
export const IdentationAttribute = () => html`
  <fleshy-jsoneditor
    .json=${json}
    mode="text"
    indentation="4"
  ></fleshy-jsoneditor>
`;
```

### In `code` mode without any `json` content

```js preview-story
export const CodeModeAndNoJSON = () => html`
  <fleshy-jsoneditor mode="code"></fleshy-jsoneditor>
`;
```

### In `tree` mode without any `json` content

```js preview-story
export const TreeModeAndNoJSON = () => html`
  <fleshy-jsoneditor mode="tree"></fleshy-jsoneditor>
`;
```

### Capturing error event to check if JSON is valid

```js preview-story
export const ErrorHandling = () => {
  const handleError = evt => {
    const el = document.getElementById('jsonStateSpan');
    el.textContent = 'bad';
  };
  const handleChange = evt => {
    const el = document.getElementById('jsonStateSpan');
    el.textContent = 'good';
  };
  return html`
    <fleshy-jsoneditor
      .json=${json}
      mode="code"
      @change=${handleChange}
      @error="${handleError}"
    ></fleshy-jsoneditor>
    <div style="margin-top: 20px">
      JSON state is <span id="jsonStateSpan">unknown (presumed good)</span>
    </div>
  `;
};
```
