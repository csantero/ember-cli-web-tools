export default function(router) {
  router.resource('web-tools', function() {
    this.route('trees', {path: 'trees'}, function() {
      this.route('detail', {path: ':id'});
    });
  });
}
