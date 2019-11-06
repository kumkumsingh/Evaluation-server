const { Router } =require('express')
const Batch = require('./model')
const Student = require('./model')
const authMiddleware = require('../User/authMiddleware')

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
router.post('/batch',(req, res, next) => {
    Batch.create(req.body)
        .then(data => {
            console.log('cheking my data',data)
            res.json(data)
           
        })
        .catch(err => next(err))
})
router.get('/batch/:id', (request, response, next) => {
    Batch.findByPk(request.params.id, { include: [Student] })
        .then(batch => response.send(batch))
        .catch(err => next(err))

})

module.exports = router