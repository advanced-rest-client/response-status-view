/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@advanced-rest-client/headers-list-view/headers-list-view.js';
import {ResponseStatusMixin} from './response-status-mixin.js';
import './response-status-styles.js';
/* eslint-disable max-len */
/**
 * HTTP redirects info panel.
 * Renders list of redirects and headers in the response.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin ResponseStatusMixin
 */
class ResponseRedirectsPanel extends ResponseStatusMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="response-status-styles">
    .status-label {
      width: 40px;
      @apply --arc-font-subhead;
    }

    .redirect-value {
      margin-top: 12px;
      @apply --layout-flex;
    }

    .redirect-location {
      margin-left: 8px;
    }

    .auto-link {
      color: var(--arc-link);
      @apply --arc-link;
    }
    </style>
    <template is="dom-if" if="[[!hasRedirects]]">
      <div class="no-info-container">
        <p class="no-info">There is no redirects information to display</p>
      </div>
    </template>
    <template is="dom-if" if="[[hasRedirects]]">
      <template is="dom-repeat" items="[[redirects]]">
        <div class="status-row">
          <div class="status-label text">
            #<span>[[_computeIndexName(index)]]</span>
          </div>
          <div class="redirect-value" on-tap="_handleLink">
            <div class="status-value status text">
              <span class\$="[[_computeStatusClass(item.status)]]">[[item.status]] [[item.statusText]]</span>
              <span class="redirect-location">to: <a href="[[_computeRedirectLocation(item.headers)]]" class="auto-link">[[_computeRedirectLocation(item.headers)]]</a></span>
            </div>
            <headers-list-view headers="[[item.headers]]"></headers-list-view>
          </div>
        </div>
      </template>
    </template>
`;
  }

  static get properties() {
    return {
      /**
       * List of redirects information.
       */
      redirects: Array,
      /**
       * Computed value, `true` when `redirects` property is set and has value
       */
      hasRedirects: {
        type: Boolean,
        value: false,
        computed: '_computeHasRedirects(redirects.*)'
      }
    };
  }

  /**
   * Computes 0-based index to 1-based number.
   * @param {Number} index
   * @return {Number}
   */
  _computeIndexName(index) {
    return index + 1;
  }
  /**
   * Extracts a location URL form the headers.
   *
   * @param {String} headers A HTTP headers string.
   * @return {String} A value of the location header or `unknown` if not
   * found.
   */
  _computeRedirectLocation(headers) {
    let def = 'unknown';
    if (!headers) {
      return def;
    }
    if (typeof headers === 'string') {
      const match = headers.match(/^location: (.*)$/im);
      if (!match) {
        return def;
      }
      return match[1];
    }
    const location = headers.get('location');
    return location || def;
  }

  _computeHasRedirects(record) {
    return !!(record && record.base && record.base.length);
  }
}
window.customElements.define('response-redirects-panel', ResponseRedirectsPanel);
