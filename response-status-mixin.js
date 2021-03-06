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
/**
 * Common function for response status view
 *
 * @mixinFunction
 * @memberof UiElements
 * @param {Function} base
 * @return {Function}
 */
export const ResponseStatusMixin = (base) => class extends base {
  static get properties() {
    return {
      /**
       * Renders mobile frinedly view
       */
      narrow: { type: Boolean }
    };
  }
  /**
   * Comnputes CSS class name depending on response status code.
   * @param {Number} code Status code
   * @return {String} Css class name for status code.
   */
  _computeStatusClass(code) {
    let cls = 'status-code-value';
    if (code >= 500 || code === 0) {
      cls += ' error';
    }
    if (code >= 400 && code < 500) {
      cls += ' warning';
    }
    if (code >= 300 && code < 400) {
      cls += ' info';
    }
    return cls;
  }
  /**
   * Click event listener to recognize click on a `link` element.
   * Dispatches `action-link-change` custom event when event's source is
   * an anchor.
   * @param {ClickEvent} e
   */
  _handleLink(e) {
    e.preventDefault();
    const path = e.composedPath();
    if (path[0] && path[0].nodeName === 'A') {
      const ev = new CustomEvent('action-link-change', {
        detail: {
          url: path[0].href
        },
        bubbles: true,
        composed: true,
        cancelable: true
      });
      this.dispatchEvent(ev);
    }
  }
};
