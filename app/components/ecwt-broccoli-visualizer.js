/* global d3 */
import Ember from 'ember';

export default Ember.Component.extend({
  data: null,

  setupChart: function () {
    var data = this.get('data');
    console.log('DATA', data);

    var self = this;
    var width = 1000;
    var height = 800;
    var radius = Math.min(width, height) / 4;
    var element = this.$('.broccoli-visualizer')[0];
    var svg = d3.select(element).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('id', 'container')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    var hue = d3.scale.category10();
    var luminance = d3.scale.sqrt()
      .domain([0, 1e6])
      .clamp(true)
      .range([90, 30]);

    var partition = d3.layout.partition()
      .size([2 * Math.PI, radius * radius])
      .value(function (d) {
        return d.size;
      });

    var arc = d3.svg.arc()
      .startAngle(function (d) {return d.x;})
      .endAngle(function (d) { return d.x + d.dx - 0.01 / (d.depth + 0.5); })
      .innerRadius(function (d) {
          return radius / 5 * d.depth;
      })
      .outerRadius(function (d) {
          return radius / 5 * (d.depth + 1) - 1;
      });

    svg.append('circle')
      .attr('r', radius)
      .style('opacity', 0);
    var node = partition.nodes(data)
      .filter(function (d) {
          return (d.dx > 0.005);
      });

    svg.data([data]).selectAll('path')
      .data(node)
      .enter().append('path')
      .attr('display', function (d) {
        return d.depth ? null : 'none';
      })
      .attr('d', arc)
      .attr('fill-rule', 'evenodd')
      .style('fill', function (d) {
        return fill(d);
      })
      .style('opacity', 1)
      .on('click', function (d) {
        self.sendAction('action', d);
      })
      .append('svg:title')
        .text(function(d) { return '%@ (%@ ms)'.fmt(d.name, parseInt(d.totalSize) / 1000); });

    function fill(d) {
      var p = d;
      while (p.depth > 1) {
        p = p.parent;
      }
      var c = d3.lab(hue(p.name));
      c.l = luminance(d.value);
      return c;
    }
  }.on('didInsertElement')
});
