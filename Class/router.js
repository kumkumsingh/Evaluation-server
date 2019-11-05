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
router.post('/class',(req,res) => {
    const classNo =  req.body.classNo
    const stDate = req.body.stDate
    const endDate = req.body.endDate
    if (!classNo || !stDate || !endDate) {
        res.status(400).send({
            message: 'Please fill out all details'
        })
    }
        else {
            Class.create({
                classNo: req.body.classNo,
                stDate: req.body.stDate,
                endDate: req.body.endDate
            })
                .then((user) => {
                    res.status(200).send({
                        status: "Your Class is created successfully!!"
                    })
                })
        }
})

module.exports = router