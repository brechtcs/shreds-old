var path = require('path')
var v = require('voca')

module.exports = function (file) {
  var base = path.basename(file, path.extname(file))
  if (base.toLowerCase() === 'index') return 'About Us'
  return v(base).replaceAll('_', ' ').titleCase().value()
}
