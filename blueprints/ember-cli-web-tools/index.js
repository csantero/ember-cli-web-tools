module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var self = this;
    return this.addBowerPackageToProject('d3', '~3.4.11')
      .then(function () {
        return self.addBowerPackageToProject('lodash', '~2.4.1');
      });
  }
};
