var minimist = require('minimist')
var press = require('../lib/press')
var opts = minimist(process.argv.slice(2))

press({
  src: opts.src,
  target: opts.target,
  bg: '#fdf6e3',
  color: '#657b83',
  dark: '#002b36',
  width: 550 
}, function (err) {
  if (err) {
    process.stderr.write(err.stack + '\n')
    process.exit(1)
  }
})
