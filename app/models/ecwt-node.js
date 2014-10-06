import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  selfTime: DS.attr('number'),
  totalTime: DS.attr('number'),
  directory: DS.belongsTo('ecwt-directory', { async: true }),
  parentNode: DS.belongsTo('ecwt-node', { async: true, inverse: 'childNodes' }),
  childNodes: DS.hasMany('ecwt-node', { async: true, inverse: 'parentNode' })
});
