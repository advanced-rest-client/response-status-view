[![Build Status](https://travis-ci.org/advanced-rest-client/response-status-view.svg?branch=master)](https://travis-ci.org/advanced-rest-client/response-status-view)  

# response-status-view

`<response-status-view>` HTTP response status view, including status, headers redirects and timings

### Full example
```
<response-status-view
  status-code="[[statusCode]]"
  status-message="[[statusMessage]]"
  request-headers="[[requestHeaders]]"
  response-headers="[[responseHeaders]]"
  loading-time="[[loadingTime]]"
  http-message="[[_computeHttpMessage(requestHeaders)]]"
  redirects="[[redirects]]"
  redirect-timings="[[redirectTimings]]"
  timings="[[timings]]"></response-status-view>
```
### Minimal example
```
<response-status-view
  status-code="[[statusCode]]"
  status-message="[[statusMessage]]"
  response-headers="[[responseHeaders]]"
  loading-time="[[loadingTime]]"></response-status-view>
```

## Data Structure

### Redirects
#### `redirects`
Array of objects. Each objects need to have the `headers` property as a HTTP headers string, `status` as a HTTP status and optionally `statusText`.
#### `redirectTimings`
Array of objects. Each object represent a HAR 1.2 timings object. See the `request-timings` element documentation for more information.
### `responseError`
A JavaScript Error object.
### `timings`
Object that represent a HAR 1.2 timings object. See the `request-timings` element documentation for more information.

## Styling
`<response-status-view>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--response-status-view` | Mixin applied to the element | `{}`
`--raml-docs-response-panel` | Mixin applied to the element | `{}`
`--arc-status-code-color-200` | Color of the 200 status code (ARC theme option) | `rgba(56, 142, 60, 1)` |
`--arc-status-code-color-300` | Color of the 300 status code (ARC theme option) | `rgba(48, 63, 159, 1)` |
`--arc-status-code-color-400` | Color of the 400 status code (ARC theme option) | `rgba(245, 124, 0, 1)` |
`--arc-status-code-color-500` | Color of the 500 status code (ARC theme option) | `rgba(211, 47, 47, 1)` |
`--arc-font-subhead` |  | `{}`
`--no-info-message` | | `{}`
`--arc-font-code1` | | `{}`
`--response-status-view-badge-background` | | `--accent-color`
`--response-status-view-badge-color` | | `#fff`

