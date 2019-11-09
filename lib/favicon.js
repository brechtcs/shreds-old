var Jimp = require('jimp')

module.exports = async function ({color}) {
  var ico = await Jimp.create(16, 16)
  ico.scan(0, 0, ico.bitmap.width, ico.bitmap.height, transform)
  return ico.getBase64Async(Jimp.MIME_PNG)

  function transform (x, y, i) {
    if (x === 0 || x === 15 || y === 0 || y === 15) {
      this.setPixelColor(x, y, Jimp.cssColorToHex(color))
    } else for (var j = 0; j < 3; j++) {
      this.bitmap.data[i + j] = rand()
    }
    this.bitmap.data[i + 3] = 255 
  }

  function rand () {
    var n = Math.random() * 255
    if (n > 158) return 255
    else if (n < 97) return 0
    return n
  }
}
