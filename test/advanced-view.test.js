import { fixture, assert, nextFrame, aTimeout } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import { StatusMessage } from '../response-status-view.js';

describe('<response-status-view>', function() {
  async function basicFixture() {
    return (await fixture(`<response-status-view></response-status-view>`));
  }

  async function statusCodeFixture() {
    return (await fixture(`<response-status-view statuscode="200"></response-status-view>`));
  }

  describe('Basic', () => {
    it('Renders all tabs', async () => {
      const element = await basicFixture();
      await nextFrame();
      const tabs = element.shadowRoot.querySelectorAll('anypoint-tab');
      assert.equal(tabs.length, 4);
    });

    it('Redirects panel is rendered', async () => {
      const element = await basicFixture();
      element.selectedTab = 2;
      await nextFrame();
      const panel = element.shadowRoot.querySelector('response-redirects-panel');
      assert.ok(panel);
    });

    it('Timings panel is rendered', async () => {
      const element = await basicFixture();
      element.selectedTab = 3;
      await nextFrame();
      const panel = element.shadowRoot.querySelector('request-timings-panel');
      assert.ok(panel);
    });

    it('Sets status message from the code', async () => {
      const element = await statusCodeFixture();
      await aTimeout();
      assert.equal(element.statusMessage, 'OK');
    });
  });

  describe('_statusCodeChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls assignStatusMessage()', async () => {
      element.statusCode = 200;
      const spy = sinon.spy(element, 'assignStatusMessage');
      element._statusCodeChanged(200);
      await aTimeout();
      assert.isTrue(spy.called);
    });
  });

  describe('StatusMessage', () => {
    [
      [0, 'Request error'],
      [100, 'Continue'],
      [101, 'Switching Protocols'],
      [200, 'OK'],
      [201, 'Created'],
      [202, 'Accepted'],
      [203, 'Non-Authoritative Information'],
      [204, 'No Content'],
      [205, 'Reset Content'],
      [206, 'Partial Content'],
      [300, 'Multiple Choices'],
      [301, 'Moved Permanently'],
      [302, 'Found'],
      [303, 'See Other'],
      [304, 'Not Modified'],
      [305, 'Use Proxy'],
      [306, '(Unused)'],
      [307, 'Temporary Redirect'],
      [400, 'Bad Request'],
      [401, 'Unauthorized'],
      [402, 'Payment Required'],
      [403, 'Forbidden'],
      [404, 'Not Found'],
      [405, 'Method Not Allowed'],
      [406, 'Not Acceptable'],
      [407, 'Proxy Authentication Required'],
      [408, 'Request Timeout'],
      [409, 'Conflict'],
      [410, 'Gone'],
      [411, 'Length Required'],
      [412, 'Precondition Failed'],
      [413, 'Request Entity Too Large'],
      [414, 'Request-URI Too Long'],
      [415, 'Unsupported Media Type'],
      [416, 'Requested Range Not Satisfiable'],
      [417, 'Expectation Failed'],
      [500, 'Internal Server Error'],
      [501, 'Not Implemented'],
      [502, 'Bad Gateway'],
      [503, 'Service Unavailable'],
      [504, 'Gateway Timeout'],
      [505, 'HTTP Version Not Supported']
    ].forEach((item) => {
      it(`Returns message for ${item[0]}`, () => {
        const result = StatusMessage.getMessage(item[0]);
        assert.equal(result, item[1]);
      });
    });
  });
});
