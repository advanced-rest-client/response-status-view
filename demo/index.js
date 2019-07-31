import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@advanced-rest-client/arc-definitions/arc-definitions.js';
import '../response-status-view.js';

class ComponentDemo extends ArcDemoPage {
  constructor() {
    super();
    this._componentName = 'response-status-view';

    let initHeaders = 'content-type: application/json\ncontent-length: 128\n';
    initHeaders += 'content-encoding: gzip';
    this.selectedTab = 0;
    this.statusCode = 200;
    this.loadingTime = 124.12;
    this.statusMessage = 'OK';
    this.requestHeaders = 'accept: application/json';
    this.responseHeaders = initHeaders;
    this.redirects = [];
    this.redirectTimings = [];
    this.requestUrl = 'https://anypoint.mulesoft.com/';
    this.requestMethod = 'GET';
    this.timings = {
      connect: 12.1345,
      send: 2.12,
      wait: 135.15,
      receive: 112.412
    };
    this.isXhr = false;
    this.isError = false;
    this.responseError = undefined;

    this._isXhrHandler = this._isXhrHandler.bind(this);
    this._isErrorHandler = this._isErrorHandler.bind(this);
    this._inputHandler = this._inputHandler.bind(this);
    this._tabHandler = this._tabHandler.bind(this);
    this.addRedirectHeader = this.addRedirectHeader.bind(this);
    this.addRedirectTimings = this.addRedirectTimings.bind(this);
    this._updateTimings = this._updateTimings.bind(this);
    this._timingInputHandler = this._timingInputHandler.bind(this);
    this._redirectInputHandler = this._redirectInputHandler.bind(this);
    this._redirectTimingInputHandler = this._redirectTimingInputHandler.bind(this);
  }

  get selectedTab() {
    return this._selectedTab;
  }

  set selectedTab(value) {
    this._setObservableProperty('selectedTab', value);
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(value) {
    this._setObservableProperty('statusCode', value);
  }

  get loadingTime() {
    return this._loadingTime;
  }

  set loadingTime(value) {
    this._setObservableProperty('loadingTime', value);
  }

  get statusMessage() {
    return this._statusMessage;
  }

  set statusMessage(value) {
    this._setObservableProperty('statusMessage', value);
  }

  get requestHeaders() {
    return this._requestHeaders;
  }

  set requestHeaders(value) {
    this._setObservableProperty('requestHeaders', value);
  }

  get responseHeaders() {
    return this._responseHeaders;
  }

  set responseHeaders(value) {
    this._setObservableProperty('responseHeaders', value);
  }

  get redirects() {
    return this._redirects;
  }

  set redirects(value) {
    this._setObservableProperty('redirects', value);
  }

  get redirectTimings() {
    return this._redirectTimings;
  }

  set redirectTimings(value) {
    this._setObservableProperty('redirectTimings', value);
  }

  get requestUrl() {
    return this._requestUrl;
  }

  set requestUrl(value) {
    this._setObservableProperty('requestUrl', value);
  }

  get requestMethod() {
    return this._requestMethod;
  }

  set requestMethod(value) {
    this._setObservableProperty('requestMethod', value);
  }

  get timings() {
    return this._timings;
  }

  set timings(value) {
    this._setObservableProperty('timings', value);
  }

  get isXhr() {
    return this._isXhr;
  }

  set isXhr(value) {
    this._setObservableProperty('isXhr', value);
  }

  get isError() {
    return this._isError;
  }

  set isError(value) {
    this._setObservableProperty('isError', value);
  }

  get responseError() {
    return this._responseError;
  }

  set responseError(value) {
    this._setObservableProperty('responseError', value);
  }

  _isXhrHandler(e) {
    this.isXhr = e.detail.value;
  }

  _isErrorHandler(e) {
    this.isError = e.detail.value;
    if (e.detail.value) {
      this.responseError = new Error('Error in the response.');
    } else {
      this.responseError = undefined;
    }
  }

  _inputHandler(e) {
    const prop = e.target.dataset.prop;
    if (!prop) {
      return;
    }
    this[prop] = e.target.value;
  }

  _tabHandler(e) {
    this.selectedTab = e.detail.value;
  }

  _computeHttpMessage(headers) {
    if (!headers) {
      return undefined;
    }
    let msg = 'GET /get HTTP/1.1\n';
    msg += headers;
    return msg;
  }

  addRedirectHeader() {
    const redirects = this.redirects || [];
    redirects.push({
      headers: 'Location: https://domain.com\n',
      status: 301,
      statusText: 'Moved'
    });
    this.redirects = [...redirects];
  }

  addRedirectTimings() {
    const redirectTimings = this.redirectTimings || [];
    redirectTimings.push({
      connect: 12.1345,
      send: 2.12,
      wait: 135.15,
      receive: 112.412
    });
    this.redirectTimings = [...redirectTimings];
  }

  _updateTimings() {
    this.timings = Object.assign({} , this.timings);
  }

  _timingInputHandler(e) {
    const prop = e.target.dataset.prop;
    if (!prop) {
      return;
    }
    this.timings[prop] = e.target.value;
    this.timings = Object.assign({}, this.timings);
  }

  _redirectInputHandler(e) {
    const prop = e.target.dataset.prop;
    if (!prop) {
      return;
    }
    let index = e.target.dataset.index;
    if (!index) {
      return;
    }
    index = Number(index);
    this.redirects[index][prop] = e.target.value;
    this.redirects = [...this.redirects];
  }

  _redirectTimingInputHandler(e) {
    const prop = e.target.dataset.prop;
    if (!prop) {
      return;
    }
    let index = e.target.dataset.index;
    if (!index) {
      return;
    }
    index = Number(index);
    this.redirectTimings[index][prop] = e.target.value;
    this.redirectTimings[index] = Object.assign({}, this.redirectTimings[index]);
    this.redirectTimings = [...this.redirectTimings];
  }

  _tabTemplate(selected) {
    switch (selected) {
      case 0: return html`
      <section>
        <div class="row">
          <paper-input
            class="status-code-input"
            type="number"
            .value="${this.statusCode}"
            data-prop="statusCode"
            @input="${this._inputHandler}"
            step="1"
            min="100"
            max="599"
            label="Status code"
            required
            auto-validate></paper-input>
          <paper-input
            type="text"
            value="${this.statusMessage}"
            data-prop="statusMessage"
            @input="${this._inputHandler}"
            label="Status message"></paper-input>
        </div>
        <div class="row">
          <paper-textarea
            label="Request headers"
            value="${this.requestHeaders}"
            data-prop="requestHeaders"
            @input="${this._inputHandler}"></paper-textarea>
        </div>
        <div class="row">
          <paper-textarea
            label="Response headers"
            value="${this.responseHeaders}"
            data-prop="responseHeaders"
            @input="${this._inputHandler}"></paper-textarea>
        </div>
        <div class="row">
          <paper-input
            type="number"
            value="${this.loadingTime}"
            data-prop="loadingTime"
            @input="${this._inputHandler}"
            step="0.001"
            min="1"
            label="Total loading time"></paper-input>
        </div>
      </section>`;
      case 1: return html`<section>
        <div class="redirect-timings-form">
          <div class="row">
            <paper-input
              type="number"
              .value="${this.timings.connect}"
              data-prop="connect"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="Connect"></paper-input>
            <paper-input
              type="number"
              .value="${this.timings.send}"
              data-prop="send"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="Send"></paper-input>
            <paper-input
              type="number"
              .value="${this.timings.wait}"
              data-prop="wait"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="Wait time"></paper-input>
            <paper-input
              type="number"
              .value="${this.timings.receive}"
              data-prop="receive"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="Receive time"></paper-input>
          </div>
          <div class="row">
            <paper-input
              type="number"
              .value="${this.timings.blocked}"
              data-prop="blocked"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="Blocked"></paper-input>
            <paper-input
              type="number"
              .value="${this.timings.dns}"
              data-prop="dns"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="DNS"></paper-input>
            <paper-input
              type="number"
              .value="${this.timings.ssl}"
              data-prop="ssl"
              @input="${this._timingInputHandler}"
              step="0.0001"
              label="SSL"></paper-input>
            <paper-button @click="${this._updateTimings}">Update</paper-button>
          </div>
        </div>
      </section>`;
      case 2: return html`<section>
        ${this.redirects.map((item, index) => html`
          <div class="row">
            <paper-input
              class="status-code-input"
              type="number"
              .value="${item.status}"
              step="1"
              min="100"
              max="599"
              label="Status code"
              required
              auto-validate
              data-index="${index}"
              data-prop="status"
              @input="${this._redirectInputHandler}"></paper-input>
            <paper-input
              type="text"
              .value="${item.statusText}"
              label="Status message"
              data-index="${index}"
              data-prop="statusText"
              @input="${this._redirectInputHandler}"></paper-input>
          </div>
          <paper-textarea
            label="Redirect headers #${index + 1}"
            .value="${item.headers}"
            data-index="${index}"
            data-prop="headers"
            @input="${this._redirectInputHandler}"></paper-textarea>
        `)}
        <paper-button @click="${this.addRedirectHeader}">Add redirect headers</paper-button>
      </section>`;
      case 3: return html`<section>
        ${this.redirectTimings.map((item, index) => html`<div class="redirect-timings-form">
          <div class="row">
            <paper-input type="number"
              .value="${item.connect}"
              data-index="${index}"
              data-prop="connect"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="Connect"></paper-input>
            <paper-input
              type="number"
              .value="${item.send}"
              data-index="${index}"
              data-prop="send"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="Send"></paper-input>
            <paper-input
              type="number"
              .value="${item.wait}"
              data-index="${index}"
              data-prop="wait"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="Wait time"></paper-input>
            <paper-input
              type="number"
              .value="${item.receive}"
              data-index="${index}"
              data-prop="receive"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="Receive time"></paper-input>
          </div>
          <div class="row">
            <paper-input
              type="number"
              .value="${item.blocked}"
              data-index="${index}"
              data-prop="blocked"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="Blocked"></paper-input>
            <paper-input
              type="number"
              .value="${item.dns}"
              data-index="${index}"
              data-prop="dns"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="DNS"></paper-input>
            <paper-input
              type="number"
              .value="${item.ssl}"
              data-index="${index}"
              data-prop="ssl"
              @input="${this._redirectTimingInputHandler}"
              step="0.0001"
              label="SSL"></paper-input>
          </div>
        </div>`)}
        <paper-button @click="${this.addRedirectTimings}">Add redirect timings</paper-button>
      </section>`;
    }
  }

  contentTemplate() {
    const {
      isXhr,
      selectedTab,
      requestMethod,
      requestUrl,
      statusCode,
      statusMessage,
      requestHeaders,
      responseHeaders,
      loadingTime,
      redirects,
      redirectTimings,
      timings,
      responseError
    } = this;
    return html`
    <h3>Display data form</h3>

    <section class="response-data-form card">
      <p class="info">Set up the request / response data.</p>

      <div class="basic-options">
        <paper-checkbox @checked-changed="${this._isXhrHandler}">XHR type of request</paper-checkbox>
        <paper-checkbox @checked-changed="${this._isErrorHandler}">Error in the response</paper-checkbox>
      </div>

      <div class="basic-options">
        <p class="info">Request info</p>
        <paper-input type="text" .value="${requestMethod}" label="HTTP method" required auto-validate data-prop="requestMethod" @input="${this._inputHandler}"></paper-input>
        <paper-input type="text" .value="${requestUrl}" label="Request URL" required auto-validate data-prop="requestUrl" @input="${this._inputHandler}"></paper-input>
      </div>

      <paper-tabs .selected="${selectedTab}" @selected-changed="${this._tabHandler}">
        <paper-tab>Basic settings</paper-tab>
        ${!isXhr ? html`
          <paper-tab>Response timings</paper-tab>
          <paper-tab>Redirect headers</paper-tab>
          <paper-tab>Redirect timings</paper-tab>
        ` : undefined}
      </paper-tabs>
      ${this._tabTemplate(selectedTab)}
    </section>

    <h3>The response-status-view</h3>
    <section class="response-status-section">
      <response-status-view
        opened
        ?narrow="${this.narrowActive}"
        .statusCode="${statusCode}"
        .statusMessage="${statusMessage}"
        .requestHeaders="${requestHeaders}"
        .responseHeaders="${responseHeaders}"
        .loadingTime="${loadingTime}"
        .redirects="${redirects}"
        .redirectTimings="${redirectTimings}"
        .timings="${timings}"
        .isXhr="${isXhr}"
        .responseError="${responseError}"
        .requestMethod="${requestMethod}"
        .requestUrl="${requestUrl}"
        .httpMessage="${this._computeHttpMessage(requestHeaders)}"></response-status-view>
    </section>
    <arc-definitions></arc-definitions>`;
  }
}
const instance = new ComponentDemo();
instance.render();
