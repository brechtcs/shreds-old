var assert = require('assert')
var containers = require('remark-containers')
var doc = require('rehype-document')
var favicon = require('../lib/favicon')
var file_title = require('../lib/title')
var fs = require('fs')
var get_style = require('../lib/css')
var html = require('rehype-stringify')
var img_shred = require('../lib/images')
var img_unwrap = require('remark-unwrap-images')
var jimp_embed = require('remark-jimp-embed')
var markdown = require('remark-parse')
var min_style = require('rehype-minify-css-style')
var min_ws = require('rehype-minify-whitespace')
var rehype = require('remark-rehype')
var unified = require('unified')

module.exports = async function press (config) {
  var {src, target, bg, color, dark, width} = config
  assert(src, 'missing config parameter: src')
  assert(target, 'missing config parameter: target')

  var title = file_title(src)
  var style = get_style({bg, color, dark, title, width})
  var ico = await favicon({color})
  var shredder = img_shred({dark, width})
  var head = {style}
  head.link = {rel: 'icon', href: ico}
  head.title = 'Shreds · ' + title

  var input = fs.readFileSync(src)
  var output = await unified()
    .use(markdown)
    .use(containers)
    .use(img_unwrap)
    .use(jimp_embed, shredder)
    .use(rehype)
    .use(doc, head)
    .use(min_style)
    .use(min_ws)
    .use(html)
    .process(input)

  fs.writeFileSync(target, output)
}
