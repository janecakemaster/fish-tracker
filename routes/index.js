const express = require('express')
const dsv = require('d3-dsv')
const fs = require('mz/fs')
const router = express.Router()

const tsvPath = 'public/data/test.tsv'

/* GET home page. */
router.get('/', (req, res, next) => {
  fs.readFile(tsvPath, 'utf8').then((data) => {
    res.render('index', {
      data: parseData(data),
      dataAvailable: true
    })
  }).catch((err) => {
    res.render('index', { dataAvailable: false  })
  })
})

function parseData(data) {
  const parsed = dsv.tsvParse(data);
  const rows = parsed.filter((el) => parseInt(el.ammonia, 10) !== NaN)
  console.log(rows)

  return parsed
}


module.exports = router
