var API = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user'
var NEWS = 'https://en.wikipedia.org/wiki/Portal:Current_events'

var cheerio = require('cheerio')
var got = require('got')
var opt = require('stdopt')
var run = require('stdrun')

run(current)

async function* current (opts = {}) {
  opts.from = opt.string(opts.from).or(recent()).value()
  opts.to = opt.string(opts.to).or(recent()).value()
  opts.n = opt.number(opts.n).or(25).value()

  var page = await got(NEWS).text()
  var $ = cheerio.load(page)

  var sections = [
    '[aria-labelledby=Topics_in_the_news] > ul',
    '[aria-labelledby=Ongoing_events]',
    '.vevent > .description'
  ]

  var links = $(sections.join(',')).find('a[href]:not(.external)').get()
  var reqs = links.map(title).filter(unique).map(function (article) {
    var url = `${API}/${encode(article)}/daily/${opts.from}/${opts.to}`
    return got(url).json().then(res => res.items).catch(err => console.error(err.message, url))
  })

  var results = await Promise.all(reqs)
  var stats = results.flat().reduce(totals, []).sort(desc)
  var digits = String(stats[0].views).length

  for (var i = 0; i < opts.n; i++) {
    var views = String(stats[i].views).padStart(digits)
    yield views + ': https://en.wikipedia.org/wiki/' + stats[i].article + '\n'
  }
}

/**
 * Helpers
 */
function desc (a, b) {
  return a.views > b.views ? -1 : b.views > a.views ? 1 : 0
}

function encode (url) {
  url = url.replace(/\//g, encodeURIComponent('/'))
  url = url.replace(/\#(.+)$/, '')
  return url
}

function recent () {
  var date = new Date()
  var update = new Date(Date.UTC(date.getYear() + 1900, date.getMonth(), date.getDate(), 5))
  date.setDate(date > update ? date.getDate() - 1 : date.getDate() - 2)

  var year = String(date.getYear() + 1900)
  var month = String(date.getMonth() + 1).padStart(2, '0')
  var day = String(date.getDate()).padStart(2, '0')
  return year + month + day
}

function title (el) {
  var href = cheerio(el).attr('href')
  return href.replace(/^\/wiki\//, '')
}

function totals (stats, item) {
  var stat = stats.find(stat => item && stat.article === item.article)
  if (stat) stat.views += item.views
  else if (item) stats.push({article: item.article, views: item.views})
  return stats
}

function unique (article, i, self) {
  return self.indexOf(article) === i
}
