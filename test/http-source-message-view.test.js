import { fixture, assert } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../http-source-message-view.js';

describe('<http-source-message-view>', function() {
  async function basicFixture() {
    return (await fixture(`<http-source-message-view></http-source-message-view>`));
  }

  async function openedFixture() {
    return (await fixture(`<http-source-message-view opened></http-source-message-view>`));
  }

  async function iconPrefixFixture() {
    return (await fixture(`<http-source-message-view iconprefix="other"></http-source-message-view>`));
  }

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
    it('sets default iconPrefix', async () => {
      const element = await basicFixture();
      assert.equal(element.iconPrefix, 'arc');
    });

    it('changes iconPrefix from the attribute', async () => {
      const element = await iconPrefixFixture();
      assert.equal(element.iconPrefix, 'other');
    });
  });

  describe('toggle()', () => {
    it('changes opened flag to true', async () => {
      const element = await basicFixture();
      element.toggle();
      assert.isTrue(element.opened);
    });

    it('changes opened flag to false', async () => {
      const element = await openedFixture();
      element.toggle();
      assert.isFalse(element.opened);
    });

    it('calls toggle when header click', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('h5');
      node.click();
      assert.isTrue(element.opened);
    });
  });

  describe('_computeIcon()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('returns value for opened and no prefix', () => {
      element.iconPrefix = undefined;
      const result = element._computeIcon(true);
      assert.equal(result, 'expand-less');
    });

    it('returns value for closed and no prefix', () => {
      element.iconPrefix = undefined;
      const result = element._computeIcon(false);
      assert.equal(result, 'expand-more');
    });

    it('returns prefixed icon', () => {
      element.iconPrefix = 'test';
      const result = element._computeIcon(true);
      assert.equal(result, 'test:expand-less');
    });
  });
});
