[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/response-status-view.svg)](https://www.npmjs.com/package/@advanced-rest-client/response-status-view)

[![Build Status](https://travis-ci.org/advanced-rest-client/response-status-view.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/response-status-view)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/response-status-view)

## &lt;response-status-view&gt;

HTTP response status view, including status, headers redirects and timings

```html
<response-status-view></response-status-view>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/response-status-view
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/response-status-view/response-status-view.js';
    </script>
  </head>
  <body>
    <response-status-view></response-status-view>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/response-status-view/response-status-view.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <response-status-view></response-status-view>
    `;
  }

  _authChanged(e) {
    console.log(e.detail);
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/response-status-view
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
