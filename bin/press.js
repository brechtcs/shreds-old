var press = require('../lib/press')
var run = require('stdrun')
var string = require('stdopt/string')

async function main (opts = {}) {
  var src = string(opts.src).or(opts.s).value()
  var target = string(opts.src).or(opts.t).value()
  var bg = '#fdf6e3'
  var color = '#657b83'
  var dark = '#002b36'
  var width = 550

  try {
    await press({src, target, bg, color, dark, width})
  } catch (err) {
    process.stderr.write(err.stack + '\n')
    process.exit(1)
  }
}

run(main)
