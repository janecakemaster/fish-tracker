const express = require('express')
const dsv = require('d3-dsv')
const fs = require('mz/fs')
const router = express.Router()

const tsvPath = 'public/data/test.tsv'

/* GET record data page. */
router.get('/', (req, res, next) => {
  res.render('record', {
    title: 'Record data'
  })
})

router.post('/', (req, res, next) => {
  const parsed = dsv.tsvFormat([req.body]);
  const toAppend = parsed.split('\n')

  fs.stat(tsvPath).then((stats) => {
    fs.appendFile(tsvPath, `\n${toAppend[1]}`).then((data) => {
      res.render('record', {
        title: 'Record data',
        success: true
      })
    }).catch((err) => {})
  }).catch((err) => {
    fs.appendFile(tsvPath, parsed).then((data) => {
      res.render('record', {
        title: 'Record data',
        success: true
      })
    }).catch((err) => {
        err.status = 500;
        next(err)
    })
  })
})

module.exports = router
