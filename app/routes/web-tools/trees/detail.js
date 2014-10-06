import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.webTools.store.find('ecwt-node', params.id)
      .then(function (node) {
        return node.get('directory')
          .then(function () {
            return node;
          });
      });
  }
});
