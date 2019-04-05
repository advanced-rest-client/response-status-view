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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/iron-collapse/iron-collapse.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
/**
 * The element displays the HTTP source message that has been sent to the remote mchine.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 */
class HttpSourceMessageView extends PolymerElement {
  static get template() {
    return html`
    <style>
     :host {
      margin: 16px 16px 0 16px;
      overflow: auto;
      display: block;
      @apply --http-source-message-view;
    }

    pre {
      word-break: break-all;
      @apply --select-text;
      @apply --arc-font-code1;
      @apply --http-source-message;
      margin-bottom: 0;
    }

    h5 {
      margin: 0;
      display: inline-block;
      cursor: pointer;
      @apply --http-source-message-view-title;
    }
    </style>
    <h5 on-tap="toggle">
      Source message
      <paper-icon-button icon="[[_computeIcon(opened)]]"></paper-icon-button>
    </h5>
    <iron-collapse id="collapse" opened="{{opened}}">
      <pre>[[message]]</pre>
    </iron-collapse>
`;
  }

  static get properties() {
    return {
      // A HTTP message to display.
      message: String,
      // True if the message is visible.
      opened: Boolean
    };
  }
  /**
   * Toggles source message visibility
   */
  toggle() {
    this.opened = !this.opened;
  }
  /**
   * Computes icon name depending on `opened` state
   * @param {Boolean} opened
   * @return {String}
   */
  _computeIcon(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  }
}
window.customElements.define('http-source-message-view', HttpSourceMessageView);
