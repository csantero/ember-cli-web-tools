var FS = require('q-io/fs');
var express = require('express');
var _ = require('lodash-node');

module.exports = {
  name: 'ember-cli-web-tools',

  included: function (app) {
    app.import('bower_components/d3/d3.js');
    app.import('bower_components/lodash/dist/lodash.js');
  },

  postBuild: function (results) {
    this.buildResults = results;
    var allNodes = this.allNodes = [];

    function addNodeAndChildren(node) {
      if (!_(allNodes).contains(node)) {
        allNodes.push(node);
        node.ecwtId = allNodes.length;
        if (node.subtrees) {
          for (var i = 0; i < node.subtrees.length; i++) {
            addNodeAndChildren(node.subtrees[i]);
          }
        }
      }
    }

    addNodeAndChildren(results.graph, 1);
  },

  serverMiddleware: function (config) {
    var app = config.app;
    var self = this;

    var webToolsRouter = express.Router();

    webToolsRouter.get('/nodes/', function(req, res, next) {
      var result = {
        ecwtNodes: self.allNodes.map(mapNodeToChildResource)
      };
      res.send(result);
      next();
    });

    webToolsRouter.get('/nodes/:id', function(req, res, next) {
      var node = self.allNodes[req.params.id - 1];

      getNodeResponse(node, function (err, result) {
        res.send(result);
        next();
      });
    });

    webToolsRouter.get('/directories/:id', function(req, res, next) {
      var node = self.allNodes[req.params.id - 1];

      getDirectoryResponse(node).then(function (response) {
        res.send(response);
        next();
      }, function (err) {
        res.status(500);
        res.send({
          errors: [err]
        });
        next();
      });
    });

    app.use('/web-tools-api', webToolsRouter);
  }
};

function getNodeResponse(node, cb) {
  var childNodes = node.subtrees.map(mapNodeToChildResource);
  var result = {
    ecwtNode: mapNodeToChildResource(node),
    ecwtNodes: childNodes
  };
  process.nextTick(function () {
    cb(null, result);
  });
}

function getDirectoryResponse(node) {
  var result = {
    ecwtDirectory: {
      id: node.ecwtId,
      path: node.directory
    }
  };
  return FS.listTree(node.directory).then(function (tree) {
    result.ecwtDirectory.files = tree;
    return result;
  });
  // dirTree(node.directory, function (err, tree) {
  //   if (err) {
  //     cb(err);
  //     return;
  //   }
  //   result.ecwtDirectory.tree = tree;
  //   cb(null, result);
  // });
}

// function dirTree(filename, cb) {
//   var info = {
//     name: path.basename(filename)
//   };
//   fs.lstat(filename, function (err, stats) {
//     if (stats.isDirectory() && !stats.isSymbolicLink()) {
//       info.type = 'directory';
//       info.children = [];
//       fs.readdir(filename, function (err, children) {
//         var resolutions = 0;
//         for (var i = 0; i < children.length; i++) {
//           dirTree(path.join(filename, children[i]), dirTreeCb);
//         }

//         function dirTreeCb(err, tree) {
//           if (err) {
//             cb(err);
//             return;
//           }

//           info.children.push(tree);
//           resolutions++;
//           if (resolutions === children.length) {
//             cb(null, info);
//           }
//         }
//       });
//     } else {
//       info.type = 'file';
//       cb(null, info);
//     }
//   });
// }

function mapNodeToChildResource(node) {
  return {
    id: node.ecwtId,
    description: node.tree.description || node.tree.constructor.name,
    childNodes: _(node.subtrees).pluck('ecwtId').value(),
    directory: node.ecwtId,
    selfTime: node.selfTime / 1000,
    totalTime: node.totalTime / 1000
  };
}
