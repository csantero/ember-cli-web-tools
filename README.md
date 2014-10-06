# Ember-cli-web-tools

A web interface for interacting with the Ember CLI development server.

### Features

* broccoli tree browser
* broccoli tree performance visualizer

This is pre-alpha software. Use at your own risk.

### Installation

To install this addon:

```
npm install --save-dev ember-cli-web-tools
ember g ember-cli-web-tools
```

To enable the addon within your app, you must configure your app's router to use the addon's routes:

```js
/// app/router.js

import Ember from 'ember';
import config from './config/environment';
import webToolsRouter from 'ember-cli-web-tools/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  webToolsRouter(this);
});
```

Assuming ember-cli is serving at `localhost:4200`, you can access the tools at `localhost:4200/web-tools`.
