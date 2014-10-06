import Ember from 'ember';

export default Ember.ObjectController.extend({
  visualizationData: Ember.computed.alias('model')
});
