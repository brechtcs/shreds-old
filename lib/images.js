var Jimp = require('jimp')

module.exports = function (opts = {}) {
  var rand_cache = new Map()
  var img_bytes = ['r', 'g', 'b', 'a']
  var light_color = color(opts.light || 'white')
  var dark_color = color(opts.dark || 'black')

  return function embed (img) {
    img.dither565()
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, iterate)
    img.resize(opts.width, Jimp.AUTO)
    img.quality(75)
    return img
  }

  function iterate (x, y, i) {
    img_bytes.forEach((byte, j) => {
      var index = i + j
      this.bitmap.data[index] = shred(byte, this.bitmap.data[index])
    })
  }

  function shred (byte, val) {
    if (byte === 'a') return 255
    else if (val > 158) return light_color[byte]
    else if (val < 97) return dark_color[byte]
    return random(val)
  }

  function random (val) {
    if (rand_cache.has(val)) {
      return rand_cache.get(val)
    }
    var rand = Math.random() * 255
    rand_cache.set(val, rand)
    return rand
  }

  function color (css) {
    var hex = Jimp.cssColorToHex(css)
    return Jimp.intToRGBA(hex)
  }
}
