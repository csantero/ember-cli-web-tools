import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:4200',
  namespace: 'web-tools-api',

  pathForType: function () {
    return 'nodes';
  }
});