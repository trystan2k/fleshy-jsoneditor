# `fleshy-jsoneditor`

#### `DOM - Structure test`

```html
<fleshy-jsoneditor>
</fleshy-jsoneditor>

```

#### `SHADOW DOM - Structure test`

```html
<div id="jsonEditorContainer">
  <div class="jsoneditor jsoneditor-mode-tree">
    <div class="jsoneditor-menu">
      <button
        class="jsoneditor-expand-all"
        title="Expand all fields"
        type="button"
      >
      </button>
      <button
        class="jsoneditor-collapse-all"
        title="Collapse all fields"
        type="button"
      >
      </button>
      <button
        class="jsoneditor-sort"
        title="Sort contents"
        type="button"
      >
      </button>
      <button
        class="jsoneditor-transform"
        title="Filter, sort, or transform contents"
        type="button"
      >
      </button>
    </div>
    <div class="jsoneditor-navigation-bar nav-bar-empty">
      <div
        class="jsoneditor-treepath"
        tabindex="0"
      >
        Select a node...
      </div>
    </div>
    <div class="has-main-menu-bar has-nav-bar jsoneditor-outer">
      <div class="jsoneditor-tree">
        <div class="jsoneditor-tree-inner">
          <table class="jsoneditor-tree">
            <colgroup>
              <col width="24px">
              <col width="24px">
              <col>
            </colgroup>
            <tbody>
              <tr class="jsoneditor-expandable jsoneditor-expanded">
                <td>
                </td>
                <td>
                  <button
                    class="jsoneditor-button jsoneditor-contextmenu-button"
                    title="Click to open the actions menu (Ctrl+M)"
                    type="button"
                  >
                  </button>
                </td>
                <td>
                  <table
                    class="jsoneditor-values"
                    style="border-collapse: collapse; margin-left: 0px;"
                  >
                    <tbody>
                      <tr>
                        <td class="jsoneditor-tree">
                          <button
                            class="jsoneditor-button jsoneditor-expanded"
                            title="Click to expand/collapse this field (Ctrl+E). 
Ctrl+Click to expand/collapse including all childs."
                            type="button"
                          >
                          </button>
                        </td>
                        <td class="jsoneditor-tree">
                          <div
                            class="jsoneditor-readonly"
                            contenteditable="false"
                          >
                            object
                          </div>
                        </td>
                        <td class="jsoneditor-tree">
                        </td>
                        <td class="jsoneditor-tree">
                          <div
                            class="jsoneditor-object jsoneditor-value"
                            title="object containing 0 items"
                          >
                            {0}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr class="jsoneditor-append">
                <td>
                </td>
                <td>
                  <button
                    class="jsoneditor-button jsoneditor-contextmenu-button"
                    title="Click to open the actions menu (Ctrl+M)"
                    type="button"
                  >
                  </button>
                </td>
                <td style="padding-left: 50px;">
                  <div class="jsoneditor-readonly">
                    (empty object)
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

```

#### `LIGHT DOM - Structure test`

```html

```

