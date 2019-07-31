import { fixture, assert, defineCE } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import { ResponseStatusMixin } from '../response-status-mixin.js';

const tag = defineCE(class extends ResponseStatusMixin(HTMLElement) {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const anchor = document.createElement('a');
    anchor.href = 'https://api.domain.com/path';
    shadow.appendChild(anchor);
    const other = document.createElement('span');
    other.innerText = 'test';
    shadow.appendChild(other);
    this._handleLink = this._handleLink.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this._handleLink);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleLink);
  }
});

describe('ResponseStatusMixin', function() {
  async function basicFixture() {
    return (await fixture(`<${tag}></${tag}>`));
  }

  describe('_computeStatusClass()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('returns default value when no matchig code', () => {
      const result = element._computeStatusClass();
      assert.equal(result, 'status-code-value');
    });

    it('adds "error" for 0', () => {
      const result = element._computeStatusClass(0);
      assert.equal(result, 'status-code-value error');
    });

    it('adds "error" for 500', () => {
      const result = element._computeStatusClass(500);
      assert.equal(result, 'status-code-value error');
    });

    it('adds "warning" for 400', () => {
      const result = element._computeStatusClass(400);
      assert.equal(result, 'status-code-value warning');
    });

    it('adds "info" for 300', () => {
      const result = element._computeStatusClass(300);
      assert.equal(result, 'status-code-value info');
    });
  });

  describe('_handleLink()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('dispatches action-link-change when anchor is target', () => {
      const spy = sinon.spy();
      element.addEventListener('action-link-change', spy);
      const anchor = element.shadowRoot.querySelector('a');
      anchor.click();
      assert.equal(spy.args[0][0].detail.url, 'https://api.domain.com/path');
    });

    it('ingores click when target is not an anchor', () => {
      const spy = sinon.spy();
      element.addEventListener('action-link-change', spy);
      const span = element.shadowRoot.querySelector('span');
      span.click();
      assert.isFalse(spy.called);
    });
  });
});
