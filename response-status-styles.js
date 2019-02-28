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
import '@polymer/polymer/polymer-element.js';
const $documentContainer = document.createElement('template');
$documentContainer.innerHTML = `<dom-module id="response-status-styles">
  <template>
    <style>
    .status-row {
      @apply --layout-horizontal;
      @apply --arc-font-subhead;
      @apply --layout-center;
      min-height: 56px;
      border-bottom: 1px var(--response-status-view-status-info-border-color, #e5e5e5) solid;
    }

    .status-value {
      @apply --layout-flex;
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --response-status-view-status-container;
    }

    .status-value > span {
      display: block;
    }

    .status-value.status.text > span:not(:first-child) {
      margin-left: 8px;
    }

    .text {
      @apply --select-text;
    }

    headers-list-view {
      margin-top: 12px;
    }

    .status-code-value {
      padding: 4px 8px;
      color: var(--response-status-view-code-value-color, #fff);
      border-radius: 3px;
      display: block;
      background-color: var(--arc-status-code-color-200, rgba(56, 142, 60, 1));
    }

    .info.status-code-value {
      background-color: var(--arc-status-code-color-300, rgba(48, 63, 159, 1));
    }

    .warning.status-code-value {
      background-color: var(--arc-status-code-color-400, rgba(245, 124, 0, 1));
    }

    .error.status-code-value {
      background-color: var(--arc-status-code-color-500, rgba(211, 47, 47, 1));
    }

    .no-info-container {
      @apply --layout-vertical;
      @apply --layout-center;
    }

    .no-info {
      @apply --no-info-message;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($documentContainer.content);
