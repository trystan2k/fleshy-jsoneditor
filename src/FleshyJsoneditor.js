import { html, css, LitElement } from 'lit-element';
import * as jsonpatch from 'fast-json-patch';
import '../lib/json-editor-import.min.js';
import '../lib/theme-jsoneditor.js';
import { jsonEditorStyles } from '../lib/json-editor-styles.js';

/* global ace, JSONEditor */
const JSONEditorAPI = [
  'set',
  'setMode',
  'setName',
  'setText',
  'get',
  'getMode',
  'getName',
  'getText',
];

/**
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
  npm i fleshy-jsoneditor
  ```

  ## Usage
  ```html
  <script type="module">
    import 'fleshy-jsoneditor/fleshy-jsoneditor.js';
  </script>

  <fleshy-jsoneditor></fleshy-jsoneditor>
  ```

  @fires change - Event emitted when the json file is updated with the new json file and patches to applied over the original
  @fires error - Event emitted when error event fired from upstream, or bad JSON is detected at fleshy-editor level


  @customElement fleshy-jsoneditor
  @LitElement
  @demo demo/index.html
*/
export class FleshyJsoneditor extends LitElement {
  static get styles() {
    return [
      jsonEditorStyles,
      css`
        :host {
          display: block;
        }

        #jsonEditorContainer {
          height: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Holds the json object to render in editor
       */
      json: {
        type: Object,
      },

      /**
       * Set the editor mode. Available values: 'tree' (default), 'view', 'form', 'code', 'text', 'preview'.
       * @see https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
       */
      mode: {
        type: String,
      },

      /**
       * Create a box in the editor menu where the user can switch between the specified modes
       * @see mode for available modes
       */
      modes: {
        type: Array,
      },

      /**
       * Initial field name for the root node
       */
      name: {
        type: String,
      },

      /**
       * Enables a search box in the upper right corner of the JSONEditor.
       * Only applicable when mode is 'tree', 'view', or 'form'.
       */
      search: {
        type: Boolean,
        reflect: true,
      },

      /**
       * Number of indentation spaces. 2 by default. Only applicable when mode is 'code', 'text', or 'preview'.
       */
      indentation: {
        type: Number,
      },

      /**
       * Enables history, adds a button Undo and Redo to the menu of the JSONEditor.
       * Only applicable when mode is 'tree', 'form', or 'preview'
       */
      history: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.json = {};
    this.modes = [];
    this.search = false;
    this.history = false;
  }

  firstUpdated() {
    /* istanbul ignore else  */
    if (this.shadowRoot) {
      this._injectTheme('#ace_editor\\.css');
      this._injectTheme('#ace-tm');
      this._injectTheme('#ace_searchbox');

      ace.config.loadModule(['theme', 'ace/theme/jsoneditor'], () => {
        this._injectTheme('#ace-jsoneditor');
      });
    }

    // Initializer needs to be done after the Ace theme is injected, otherwise
    // editor does not render correctly
    this._initializeEditor();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('mode')) {
      this.editor.setMode(this.mode);
    }

    if (changedProps.has('name')) {
      this.editor.setName(this.name);
    }

    if (changedProps.has('json')) {
      if (this._observer) {
        jsonpatch.unobserve(changedProps.get('json'), this._observer);
      }

      /* istanbul ignore else  */
      if (this.json) {
        this._observer = jsonpatch.observe(this.json, this._refresh.bind(this));
      }

      this._refresh();
    }
  }

  connectedCallback() {
    /* istanbul ignore else  */
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    /* istanbul ignore if  */
    if (this.editor) {
      this._observer = jsonpatch.observe(this.json, this._refresh);
    }
  }

  disconnectedCallback() {
    /* istanbul ignore else  */
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    /* istanbul ignore else  */
    if (this._observer) {
      jsonpatch.unobserve(this.json, this._observer);
    }
  }

  render() {
    return html`<div id="jsonEditorContainer"></div> `;
  }

  _initializeEditor() {
    this._jsonEditorContainer = this.shadowRoot.querySelector(
      '#jsonEditorContainer'
    );
    const options = {
      mode: this.mode,
      history: this.history,
      name: this.name,
      modes: this.modes,
      search: this.search,
      indentation: this.indentation,

      onChange: () => {
        /* istanbul ignore if  */
        if (!this.editor) {
          return;
        }

        try {
          const patches = jsonpatch.compare(this.json, this.editor.get());

          this.dispatchEvent(
            new CustomEvent('change', {
              detail: {
                json: this.json,
                patches,
              },
            })
          );

          /* istanbul ignore else  */
          if (this._observer) {
            jsonpatch.unobserve(this.json, this._observer);
          }
          jsonpatch.applyPatch(this.json, patches);
          this._observer = jsonpatch.observe(this.json, this._refresh);
        } catch (e) {
          this.dispatchEvent(
            new CustomEvent('error', {
              detail: {
                level: 'fleshy',
                error: e,
              },
            })
          );
        }
      },

      onError: error => {
        this.dispatchEvent(
          new CustomEvent('error', {
            detail: {
              level: 'upstream',
              error,
            },
          })
        );
      },
    };

    this.editor = new JSONEditor(this._jsonEditorContainer, options);
    this.editor.set(this.json);

    // Delegate JSONEditor API
    let apiNo = JSONEditorAPI.length - 1;
    while (apiNo) {
      this[JSONEditorAPI[apiNo]] = this.editor[JSONEditorAPI[apiNo]].bind(
        this.editor
      );
      apiNo -= 1;
    }
  }

  _refresh() {
    this.editor.set(this.json);
  }

  _injectTheme(themeId) {
    const element = document.querySelector(themeId);
    this.shadowRoot.appendChild(this._cloneStyle(element));
  }

  /* eslint-disable class-methods-use-this */
  _cloneStyle(style) {
    const styleElement = document.createElement('style');
    styleElement.id = style.id;
    styleElement.textContent = style.textContent;
    return styleElement;
  }
}
