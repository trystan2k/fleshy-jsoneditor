import { html, fixture, expect, assert } from '@open-wc/testing';
import sinon from 'sinon';

import '../fleshy-jsoneditor.js';

describe('fleshy-jsoneditor', () => {
  it('initializes JSONEditor with the configuration passed', async () => {
    const jsonEditorSpy = sinon.spy(window, 'JSONEditor');
    /* eslint-disable lit/attribute-value-entities */
    const el = await fixture(html`
      <fleshy-jsoneditor
        mode="code"
        indentation="3"
        name="object"
        history
        search
        modes='["code", "tree"]'
      >
      </fleshy-jsoneditor>
    `);

    const expectedOptions = {
      history: true,
      indentation: 3,
      mode: 'code',
      modes: ['code', 'tree'],
      name: 'object',
      search: true,
    };

    const container = el.shadowRoot.querySelector('#jsonEditorContainer');

    expect(jsonEditorSpy).to.have.been.calledWith(
      container,
      sinon.match(expectedOptions)
    );

    jsonEditorSpy.restore();
  });

  it('sets correct mode when new one is informed JSONEditor with the configuration passed', async () => {
    const el = await fixture(html`
      <fleshy-jsoneditor mode="view"> </fleshy-jsoneditor>
    `);

    expect(el.getMode()).to.equal('view');

    el.mode = 'code';
    await el.updateComplete;
    expect(el.getMode()).to.equal('code');
  });

  it('sets correct name when new one is informed JSONEditor with the configuration passed', async () => {
    const el = await fixture(html`
      <fleshy-jsoneditor name="my-json"> </fleshy-jsoneditor>
    `);

    expect(el.getName()).to.equal('my-json');

    el.name = 'my-new-name';
    await el.updateComplete;
    expect(el.getName()).to.equal('my-new-name');
  });

  it('sets correct json when new one is informed JSONEditor with the configuration passed', async () => {
    const json = {
      test: '',
      status: 'starting',
    };
    const el = await fixture(html`
      <fleshy-jsoneditor name="my-json"> </fleshy-jsoneditor>
    `);

    el.json = json;
    await el.updateComplete;

    expect(el.get()).to.deep.equal(json);

    const newJson = {
      test: 'ok',
      status: 'completed',
      result: {
        status: 'success',
      },
    };
    el.json = newJson;
    await el.updateComplete;
    expect(el.get()).to.deep.equal(newJson);
  });

  it('fires an event with when new data is entered in the code mode', async () => {
    const el = await fixture(html`
      <fleshy-jsoneditor name="my-json" mode="code"> </fleshy-jsoneditor>
    `);

    return new Promise(resolve => {
      el.addEventListener('change', event => {
        expect(event.detail.json).to.deep.equal({});
        resolve();
      });

      const textArea = el.shadowRoot.querySelector('textarea.ace_text-input');
      const evt = new Event('input');
      textArea.value = ' ';
      textArea.dispatchEvent(evt);
    });
  });

  it('fires an event with when when data is invalid', async () => {
    const el = await fixture(html`
      <fleshy-jsoneditor name="my-json" mode="code"> </fleshy-jsoneditor>
    `);

    return new Promise(resolve => {
      el.addEventListener('change', () => {
        assert.fail('Should not send change event if input is invalid');
      });

      el.addEventListener('error', event => {
        expect(event.detail.level).to.equal('fleshy');
        expect(event.detail.error).to.not.be.undefined;
        resolve();
      });

      const textArea = el.shadowRoot.querySelector('textarea.ace_text-input');
      const evt = new Event('input');
      textArea.value = ',';
      textArea.dispatchEvent(evt);
    });
  });

  it('fires an event if onError callback is called', async () => {
    const el = await fixture(html`
      <fleshy-jsoneditor name="my-json" mode="code"> </fleshy-jsoneditor>
    `);

    return new Promise(resolve => {
      el.addEventListener('error', event => {
        expect(event.detail.level).to.equal('upstream');
        expect(event.detail.error).to.not.be.undefined;
        resolve();
      });

      el.editor._onError('Error');
    });
  });

  it('DOM - Structure test', async () => {
    const el = await fixture(html`<fleshy-jsoneditor></fleshy-jsoneditor> `);
    assert.dom.equalSnapshot(el);
  });

  it('SHADOW DOM - Structure test', async () => {
    const el = await fixture(html`<fleshy-jsoneditor></fleshy-jsoneditor> `);
    assert.shadowDom.equalSnapshot(el);
  });

  it('LIGHT DOM - Structure test', async () => {
    const el = await fixture(html`<fleshy-jsoneditor></fleshy-jsoneditor> `);
    assert.lightDom.equalSnapshot(el);
  });
});
