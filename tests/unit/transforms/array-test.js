import { test, moduleFor } from 'ember-qunit';

moduleFor('transform:array', 'Unit - ArrayTransform', {
});

test('it exists', function () {
  var transform = this.subject();
  ok(transform);
});

test('serialize', function () {
  var transform = this.subject();

  var fixtures = [
    [[], []],
    [[1], [1]],
    [[1, 2], [1, 2]],
    [[1, 2, 3], [1, 2, 3]],
    [undefined, []],
    [null, []],
  ];

  fixtures.forEach(function (fixture) {
    var serialized = transform.serialize(fixture[0]);
    deepEqual(serialized, fixture[1]);
  });
});

test('deserialize', function () {
  var transform = this.subject();

  var fixtures = [
    [[], []],
    [[1], [1]],
    [[1, 2], [1, 2]],
    [[1, 2, 3], [1, 2, 3]],
    [undefined, []],
    [null, []],
  ];
  fixtures.forEach(function (fixture) {
    var deserialized = transform.deserialize(fixture[0]);
    deepEqual(deserialized, fixture[1]);
  });
});
