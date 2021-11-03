const multipleRouter = require('express').Router()
const mysql = require('../db-config')

multipleRouter.get('/', (req, res) => {
    mysql.query('SELECT * FROM multiple', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database')
      } else {
        res.status(200).json(result)
      }
    })
  })

  multipleRouter.post('/', (req, res) => {
    const liveData = [
      req.body.image_1,
      req.body.image_2,
      req.body.image_3,
      req.body.image_text
    ]
    
    console.table(req.body)
    const sql =
      'INSERT INTO multiple (image_1, image_2, image_3, image_text) VALUES (?, ?, ?, ?)'
    mysql.query(sql, liveData, (err, result) => {
      if (err) {
          console.log(err);
        res.status(500).send(err)
      } else {
        console.table(result)
        res.status(201).json(result)
      }
    })
  })

  module.exports = multipleRouter