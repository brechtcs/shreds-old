var visit = require('unist-util-visit')

module.exports = function () {
  return function (tree) {
    visit(tree, function (node) {
      if (node.tagName === 'blockquote') {
        node.tagName = 'aside'
      }
    })
  }
}
