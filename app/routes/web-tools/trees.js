/* global _ */
import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.webTools.store.findAll('ecwt-node').then(function (nodes) {
      var root = nodes.objectAt(0);

      function getHierarchy(node) {
        var obj = {
          node: node,
          name: node.get('description')
        };
        return node.get('childNodes').then(function (childNodes) {
          if (childNodes.get('length')) {
            return Ember.RSVP.all(childNodes.map(getHierarchy))
              .then(function (results) {
                obj.children = results;
                obj.totalSize = _(results).pluck('totalSize').reduce(function (prev, next) {
                  return prev + next;
                }, 0);
                return obj;
              });
          }
          obj.size = node.get('selfTime');
          obj.totalSize = obj.size;

          return obj;
        });
      }

      return getHierarchy(root);
    });
  },

  actions: {
    treeClicked: function (d) {
      this.transitionTo('web-tools.trees.detail', d.node.get('id'));
    }
  }
});
