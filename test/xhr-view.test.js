import { fixture, assert, aTimeout, nextFrame } from '@open-wc/testing';
import '../response-status-view.js';

describe('<response-status-view>', function() {
  async function basicFixture() {
    return (await fixture(`<response-status-view isxhr></response-status-view>`));
  }

  describe('basic', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Updates status message after status code change', async () => {
      element.statusCode = 200;
      await aTimeout();
      assert.equal(element.statusMessage, 'OK');
    });

    it('Renders only 2 tabs', () => {
      const tabs = element.shadowRoot.querySelectorAll('paper-tab');
      assert.equal(tabs.length, 2);
    });

    it('Redirects panel is not rendered', () => {
      const panel = element.shadowRoot.querySelector('response-redirects-panel');
      assert.notOk(panel);
    });

    it('Timings panel is not rendered', () => {
      const panel = element.shadowRoot.querySelector('request-timings-panel');
      assert.notOk(panel);
    });

    it('Selects first tab when `isXhr` changes', () => {
      element.isXhr = false;
      element.selectedTab = 2;
      element.isXhr = true;
      assert.equal(element.selectedTab, 0);
    });
  });

  describe('Errored response', () => {
    let element;

    it('Detail toggle is not rendered', async () => {
      element = await basicFixture();
      element.responseError = new Error('Test error');
      await nextFrame();
      const button = element.shadowRoot.querySelector('.toggle-button');
      assert.notOk(button);
    });

    it('Renders error label', async () => {
      element = await basicFixture();
      element.responseError = new Error('Test error');
      await nextFrame();
      const label = element.shadowRoot.querySelector('.response-error-label');
      assert.ok(label);
    });

    it('Closes opened collapse when opened', async () => {
      element = await basicFixture();
      element.opened = true;
      element.responseError = new Error('Test error');
      assert.isFalse(element.opened);
    });

    it('Response time label is not rendered when no timing', async () => {
      element = await basicFixture();
      element.responseError = new Error('Test error');
      await nextFrame();
      const label = element.shadowRoot.querySelector('.response-time');
      assert.notOk(label);
    });
  });

  describe('HTTP source message', () => {
    let element;
    const message = `GET /path HTTP/1.1
    Host: domain.com

    `;

    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Renders http-source-message-view panel', async () => {
      element.httpMessage = message;
      element.selectedTab = 1;
      await nextFrame();
      const panel = element.shadowRoot.querySelector('http-source-message-view');
      assert.ok(panel);
    });
  });

  describe('Request headers', () => {
    let element;
    const headers = `Host: domain.com
    Accept: application/json
    Location: https://domainl.com`;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Renders headers-list-view panel', async () => {
      element.requestHeaders = headers;
      element.selectedTab = 1;
      await nextFrame();
      const panel = element.shadowRoot.querySelector('headers-list-view[data-source="request-headers"]');
      assert.ok(panel);
    });

    it('Renders empty info message', async () => {
      element.selectedTab = 1;
      await nextFrame();
      const panel = element.shadowRoot.querySelector('.request-headers-panel .no-info');
      assert.ok(panel);
    });
  });

  describe('Response headers', () => {
    let element;
    const headers = `Host: domain.com
    Accept: application/json
    Location: https://domainl.com`;

    beforeEach(async () => {
      element = await basicFixture();
      element.selectedTab = 0;
      await nextFrame();
    });

    it('Renders headers-list-view panel', async () => {
      element.responseHeaders = headers;
      await nextFrame();
      const panel = element.shadowRoot.querySelector('headers-list-view[data-source="response-headers"]');
      assert.ok(panel);
    });

    it('Renders empty info message', () => {
      const panel = element.shadowRoot.querySelector('.response-headers-panel .no-info');
      assert.ok(panel);
    });
  });
});
