import { fixture, assert, nextFrame, aTimeout } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../response-status-view.js';

describe('<response-status-view>', function() {
  async function basicFixture() {
    return (await fixture(`<response-status-view></response-status-view>`));
  }

  async function openedFixture() {
    return (await fixture(`<response-status-view opened></response-status-view>`));
  }

  async function isXhrFixture() {
    return (await fixture(`<response-status-view isxhr></response-status-view>`));
  }

  async function statusMessageFixture() {
    return (await fixture(`<response-status-view statusmessage="test"></response-status-view>`));
  }

  async function statusCodeFixture() {
    return (await fixture(`<response-status-view statuscode="200"></response-status-view>`));
  }

  describe('statusCode setter/getter', () => {
    it('sets _statusCode value', async () => {
      const element = await basicFixture();
      element.statusCode = 200;
      assert.equal(element._statusCode, 200);
    });

    it('getter has value', async () => {
      const element = await basicFixture();
      element.statusCode = 200;
      assert.equal(element.statusCode, 200);
    });

    it('calls requestUpdate()', async () => {
      const element = await statusCodeFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.statusCode = 400;
      assert.equal(spy.args[0][0], 'statusCode', 'has first argument');
      assert.equal(spy.args[0][1], 200, 'has old value');
    });

    it('ignores when already set', async () => {
      const element = await statusCodeFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.statusCode = 200;
      assert.isFalse(spy.called);
    });

    it('calls _statusCodeChanged()', async () => {
      const element = await statusCodeFixture();
      const spy = sinon.spy(element, '_statusCodeChanged');
      element.statusMessage = 401;
      assert.isTrue(spy.called);
    });

    it('Sets default status code when missing', async () => {
      const element = await statusCodeFixture();
      element.statusCode = undefined;
      assert.equal(element.statusCode, 0);
    });
  });

  describe('statusMessage setter/getter', () => {
    it('sets _statusMessage value', async () => {
      const element = await basicFixture();
      element.statusMessage = 'test';
      assert.equal(element._statusMessage, 'test');
    });

    it('getter has value', async () => {
      const element = await basicFixture();
      element.statusMessage = 'test';
      assert.equal(element.statusMessage, 'test');
    });

    it('calls requestUpdate()', async () => {
      const element = await statusMessageFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.statusMessage = 'other';
      assert.equal(spy.args[0][0], 'statusMessage', 'has first argument');
      assert.equal(spy.args[0][1], 'test', 'has old value');
    });

    it('ignores when already set', async () => {
      const element = await statusMessageFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.statusMessage = 'test';
      assert.isFalse(spy.called);
    });

    it('calls _statusCodeChanged()', async () => {
      const element = await statusMessageFixture();
      const spy = sinon.spy(element, '_statusCodeChanged');
      element.statusMessage = 'other';
      assert.isTrue(spy.called);
    });
  });

  describe('responseError setter/getter', () => {
    it('sets _responseError value', async () => {
      const element = await basicFixture();
      const error = new Error('test');
      element.responseError = error;
      assert.isTrue(element._responseError === error);
    });

    it('getter has value', async () => {
      const element = await basicFixture();
      const error = new Error('test');
      element.responseError = error;
      assert.isTrue(element.responseError === error);
    });

    it('calls requestUpdate()', async () => {
      const element = await basicFixture();
      const error = new Error('test');
      element.responseError = error;
      const spy = sinon.spy(element, 'requestUpdate');
      const other = new Error('other');
      element.responseError = other;
      assert.equal(spy.args[0][0], 'responseError', 'has first argument');
      assert.isTrue(spy.args[0][1] === error, 'has old value');
    });

    it('ignores when already set', async () => {
      const element = await basicFixture();
      const error = new Error('test');
      element.responseError = error;
      const spy = sinon.spy(element, 'requestUpdate');
      element.responseError = error;
      assert.isFalse(spy.called);
    });

    it('closes the element', async () => {
      const element = await openedFixture();
      const error = new Error('test');
      element.responseError = error;
      assert.isFalse(element.opened);
    });
  });

  describe('isXhr setter/getter', () => {
    it('sets _isXhr value', async () => {
      const element = await basicFixture();
      element.isXhr = true;
      assert.isTrue(element._isXhr);
    });

    it('getter has value', async () => {
      const element = await basicFixture();
      element.isXhr = true;
      assert.isTrue(element.isXhr);
    });

    it('calls requestUpdate()', async () => {
      const element = await isXhrFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.isXhr = false;
      assert.equal(spy.args[0][0], 'isXhr', 'has first argument');
      assert.equal(spy.args[0][1], true, 'has old value');
    });

    it('ignores when already set', async () => {
      const element = await isXhrFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.isXhr = true;
      assert.isFalse(spy.called);
    });

    it('calls _isXhrChanged()', async () => {
      const element = await isXhrFixture();
      const spy = sinon.spy(element, '_isXhrChanged');
      element.isXhr = false;
      assert.equal(spy.args[0][0], false, 'has argument');
    });
  });

  describe('opened setter/getter', () => {
    it('sets _opened value', async () => {
      const element = await basicFixture();
      element.opened = true;
      assert.isTrue(element._opened);
    });

    it('getter has value', async () => {
      const element = await basicFixture();
      element.opened = true;
      assert.isTrue(element.opened);
    });

    it('sets aria-expanded value when opened', async () => {
      const element = await basicFixture();
      element.opened = true;
      assert.equal(element.getAttribute('aria-expanded'), 'true');
    });

    it('sets aria-expanded value when closed', async () => {
      const element = await openedFixture();
      element.opened = false;
      assert.equal(element.getAttribute('aria-expanded'), 'false');
    });

    it('calls requestUpdate()', async () => {
      const element = await openedFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.opened = false;
      assert.equal(spy.args[0][0], 'opened', 'has first argument');
      assert.equal(spy.args[0][1], true, 'has old value');
    });

    it('ignores when already set', async () => {
      const element = await openedFixture();
      const spy = sinon.spy(element, 'requestUpdate');
      element.opened = true;
      assert.isFalse(spy.called);
    });
  });

  describe('constructor()', () => {
    let element;

    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets default loadingTime', () => {
      assert.equal(element.loadingTime, 0);
    });

    it('sets default selectedTab', () => {
      assert.equal(element.selectedTab, 0);
    });

    it('sets default opened', () => {
      assert.isFalse(element.opened);
    });

    it('sets default iconPrefix', () => {
      assert.equal(element.iconPrefix, 'arc');
    });
  });

  describe('_statusCodeChanged()', () => {
    let element;

    beforeEach(async () => {
      element = await basicFixture();
    });

    it('calls assignStatusMessage()', async () => {
      const spy = sinon.spy(element, 'assignStatusMessage');
      element._statusCodeChanged();
      await aTimeout();
      assert.isTrue(spy.called);
    });

    it('is called by status code change', async () => {
      const spy = sinon.spy(element, 'assignStatusMessage');
      element.statusCode = 200;
      await aTimeout();
      assert.isTrue(spy.called);
    });
  });

  describe('_computeHeadersLength()', () => {
    let element;
    const badgeCls = 'badge';
    const badgeClsEmpty = badgeCls + ' empty';

    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Computes badge class for undefined', () => {
      const result = element._computeBageClass();
      assert.equal(result, badgeClsEmpty);
    });

    it('Computes badge class for empty string', () => {
      const result = element._computeBageClass('');
      assert.equal(result, badgeClsEmpty);
    });

    it('Computes badge class for "0"', () => {
      const result = element._computeBageClass(0);
      assert.equal(result, badgeClsEmpty);
    });

    it('Computes badge class for any string', () => {
      const result = element._computeBageClass('test');
      assert.equal(result, badgeCls);
    });

    it('Computes badge class for "1"', () => {
      const result = element._computeBageClass(1);
      assert.equal(result, badgeCls);
    });
  });

  describe('_computeHeadersLength()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Computes size of empty headers', () => {
      const result = element._computeHeadersLength('');
      assert.equal(result, 0);
    });

    it('Computes size of undefined headers', () => {
      const result = element._computeHeadersLength('');
      assert.equal(result, 0);
    });

    it('Computes size of defined headers', () => {
      const result = element._computeHeadersLength('x-a:1\nx-b:2');
      assert.equal(result, 2);
    });
  });

  describe('_roundTime()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('rounds input value', () => {
      const result = element._roundTime(1.234567);
      assert.equal(result, 1.23);
    });

    it('returns empty string when no valid input', () => {
      const result = element._roundTime('test');
      assert.equal(result, '');
    });
  });

  describe('toggleCollapse()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('toggles opened', () => {
      element.toggleCollapse();
      assert.isTrue(element.opened);
    });

    it('toggles opened from toggle button click', () => {
      const node = element.shadowRoot.querySelector('.toggle-button');
      node.click();
      assert.isTrue(element.opened);
    });

    it('changes class name on toggle icon', async () => {
      const node = element.shadowRoot.querySelector('.toggle-button');
      node.click();
      await nextFrame();
      const icon = node.querySelector('iron-icon');
      assert.include(icon.className.trim(), 'toggle-icon opened');
    });
  });

  describe('_computeToggleIconClass()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Class name when not opened', () => {
      const result = element._computeToggleIconClass(false);
      assert.equal(result, 'toggle-icon');
    });

    it('Class name when opened', () => {
      const result = element._computeToggleIconClass(true);
      assert.equal(result, 'toggle-icon opened');
    });
  });

  describe('assignStatusMessage()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('assigns message to a status code', () => {
      element.statusCode = 200;
      element.assignStatusMessage();
      assert.equal(element.statusMessage, 'OK');
    });

    it('ignores when message is set', () => {
      element.statusCode = 200;
      element.statusMessage = 'xxx';
      element.assignStatusMessage();
      assert.equal(element.statusMessage, 'xxx');
    });
  });

  describe('_isXhrChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets selectedTab to 0 and isXhr', () => {
      element.selectedTab = 2;
      element._isXhrChanged(true);
      assert.equal(element.selectedTab, 0);
    });

    it('keeps current selectedTab when not isXhr', () => {
      element.selectedTab = 2;
      element._isXhrChanged(false);
      assert.equal(element.selectedTab, 2);
    });

    it('notifies tabs', () => {
      const tabs = element.shadowRoot.querySelector('paper-tabs');
      const spy = sinon.spy(tabs, 'notifyResize');
      element._isXhrChanged(true);
      assert.isTrue(spy.called);
    });

    it('ignores undefined', () => {
      const tabs = element.shadowRoot.querySelector('paper-tabs');
      const spy = sinon.spy(tabs, 'notifyResize');
      element._isXhrChanged();
      assert.isFalse(spy.called);
    });
  });

  describe('_tabChangeHandler()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets selectedTab property from detail.value', () => {
      element._tabChangeHandler({
        detail: {
          value: 1
        }
      });
      assert.equal(element.selectedTab, 1);
    });

    it('changes selection when tab changed', () => {
      const node = element.shadowRoot.querySelectorAll('paper-tabs paper-tab')[1];
      node.click();
      assert.equal(element.selectedTab, 1);
    });
  });

  describe('_computeIcon()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('returns passed argument when no prefix', () => {
      element.iconPrefix = undefined;
      const result = element._computeIcon('test');
      assert.equal(result, 'test');
    });

    it('returns prefixed icon', () => {
      element.iconPrefix = 'arc';
      const result = element._computeIcon('test');
      assert.equal(result, 'arc:test');
    });
  });

  describe('a11y', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.redirects = [{
        status: 301,
        statusText: 'Moved Permanently',
        headers: `Location: https://domain.com
        content-type: application/json
        content-length: 128
        content-encoding: gzip`
      }];
      element.redirectTimings = [{
        connect: 12.1345,
        send: 2.12,
        wait: 135.15,
        receive: 112.412
      }];
      element.timings = {
        connect: 12.1345,
        send: 2.12,
        wait: 135.15,
        receive: 112.412
      };
      element.statusCode = 200;
      element.statusMessage = 'OK';
      element.loadingTime = '123.456 ms';
      element.responseHeaders = `
        content-type: application/json
        content-length: 128
        content-encoding: gzip`;
      element.requestHeaders = `
      accept: application/json`;
      element.httpMessage = `
      GET /page HTTP/1.1
      accept: application/json`;
      element.requestUrl = 'https://api.domain.com';
      element.requestMethod = 'GET';
    });

    it('is accessible', async () => {
      await assert.isAccessible(element);
    });
  });
});
