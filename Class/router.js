const { Router } =require('express')
const Class = require('./model')
const authMiddleware = require('../Teacher/authMiddleware')

const router = new Router()
//getting all details of a class 
router.get('/class',(req,res) => {
     Class.findAll()
     .then(classes => {
         res.json(classes)
     })
     .catch(err => next(err))
})
//adding or creating class
router.post('/class', (req, res, next) => {
    Class.create(req.body)
        .then(data => {
            res.json(data)
            //console.log('cheking my data',data)
        })
        .catch(err => next(err))
})

module.exports = router