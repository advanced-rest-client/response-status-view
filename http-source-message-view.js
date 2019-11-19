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
import { LitElement, html, css } from 'lit-element';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@polymer/iron-collapse/iron-collapse.js';
import { expandLess, expandMore } from '@advanced-rest-client/arc-icons/ArcIcons.js';
/**
 * The element displays the HTTP source message that has been sent to the remote mchine.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 */
class HttpSourceMessageView extends LitElement {
  get styles() {
    return css`:host {
      overflow: auto;
      display: block;
    }

    pre {
      word-break: break-all;
      user-select: text;
      font-family: var(--arc-font-code-family, initial);
      margin-bottom: 0;
    }

    .title {
      margin: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      display: block;
      width: 24px;
      height: 24px;
      fill: currentColor;
    }`;
  }

  render() {
    const { opened, message, compatibility, toggleIcon } = this;
    return html`<style>${this.styles}</style>
    <div
      class="title"
      @click="${this.toggle}"
    >
      Source message
      <anypoint-icon-button
        title="Toggles source view"
        aria-label="Press to toggle source view"
        ?compatibility="${compatibility}"
      >
        <span class="icon">${toggleIcon}</span>
      </anypoint-icon-button>
    </div>
    <iron-collapse
      id="collapse"
      .opened="${opened}"
    >
      <pre>${message}</pre>
    </iron-collapse>`;
  }

  static get properties() {
    return {
      // A HTTP message to display.
      message: { type: String },
      // True if the message is visible.
      opened: { type: Boolean },
      /**
       * Enables compatibility view with Anypoint platform
       */
      compatibility: { type: Boolean }
    };
  }

  get toggleIcon() {
    return this.opened ? expandLess : expandMore;
  }

  get opened() {
    return this._opened;
  }

  set opened(value) {
    const old = this._opened;
    if (old === value) {
      return;
    }
    this._opened = value;
    this.requestUpdate('opened', old);
    if (value) {
      this.setAttribute('aria-expanded', 'true');
    } else {
      this.setAttribute('aria-expanded', 'false');
    }
  }
  /**
   * Toggles source message visibility
   */
  toggle() {
    this.opened = !this.opened;
  }
}
window.customElements.define('http-source-message-view', HttpSourceMessageView);
