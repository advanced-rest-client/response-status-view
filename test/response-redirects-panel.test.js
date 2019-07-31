import { fixture, assert } from '@open-wc/testing';
import '../response-redirects-panel.js';

describe('<response-redirects-panel>', function() {
  async function basicFixture() {
    return (await fixture(`<response-redirects-panel></response-redirects-panel>`));
  }

  describe('_computeRedirectLocation()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns "unknown" when no value', () => {
      const result = element._computeRedirectLocation();
      assert.equal(result, 'unknown');
    });

    it('Returns "unknown" when no location header', () => {
      const result = element._computeRedirectLocation('x-a: value-a\nx-b: value-b');
      assert.equal(result, 'unknown');
    });

    it('Returns location value from string', () => {
      const result = element._computeRedirectLocation('x-a: value-a\nlocation: xyz\nx-b: value-b');
      assert.equal(result, 'xyz');
    });

    it('Ignores string case', () => {
      const result = element._computeRedirectLocation('x-a: value-a\nLocation: xyz\nx-b: value-b');
      assert.equal(result, 'xyz');
    });

    it('Returns location from Headers object', () => {
      if (typeof Headers === 'undefined') {
        return;
      }
      const headers = new Headers([['location', 'xyz']]);
      const result = element._computeRedirectLocation(headers);
      assert.equal(result, 'xyz');
    });

    it('Returns "unknown" when Headers object has no location', () => {
      if (typeof Headers === 'undefined') {
        return;
      }
      const headers = new Headers();
      const result = element._computeRedirectLocation(headers);
      assert.equal(result, 'unknown');
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
    });

    it('is accessible', async () => {
      await assert.isAccessible(element);
    });
  });
});
