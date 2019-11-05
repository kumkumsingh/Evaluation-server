const { Router } =require('express')
const Batch = require('./model')
const authMiddleware = require('../Teacher/authMiddleware')

const router = new Router()
//getting all details of a class 
router.get('/batch',(req,res) => {
    Batch.findAll()
     .then(batches => {
         res.json(batches)
     })
     .catch(err => next(err))
})
//adding or creating class
router.post('/batch', (req, res, next) => {
    Batch.create(req.body)
        .then(data => {
            res.json(data)
            //console.log('cheking my data',data)
        })
        .catch(err => next(err))
})

module.exports = router