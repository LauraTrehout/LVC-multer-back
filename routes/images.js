const imageRouter = require('express').Router()
const mysql = require('../db-config')

imageRouter.get('/', (req, res) => {
    mysql.query('SELECT * FROM single', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database')
      } else {
        res.status(200).json(result)
      }
    })
  })

  imageRouter.post('/', (req, res) => {
    const liveData = [
      req.body.single_text,
      req.body.single_image
    ]
    const sql =
      'INSERT INTO single (single_text, single_image) VALUES (?, ?)'
    mysql.query(sql, liveData, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error from database')
      } else {
        console.table(result)
        res.status(201).json(result)
      }
    })
  })

  module.exports = imageRouter