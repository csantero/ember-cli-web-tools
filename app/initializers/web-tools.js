import WebToolsStore from 'ember-cli-web-tools/stores/web-tools';

export var initialize = function(container, application) {
  application.register('store:web-tools', WebToolsStore);
  application.inject('route', 'webTools', 'service:web-tools');
  application.inject('controller', 'webTools', 'service:web-tools');
  application.inject('component', 'webTools', 'service:web-tools');
  application.inject('service:web-tools', 'store', 'store:web-tools');
};

export default {
  name: 'web-tools',

  initialize: initialize
};
