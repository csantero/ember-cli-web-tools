import Ember from 'ember';
import config from './config/environment';
import webToolsRouter from 'ember-cli-web-tools/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  webToolsRouter(this);
});

export default Router;
