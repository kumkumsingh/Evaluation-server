const { Router } =require('express')
const Student = require('./model')
const Class = require('../Class/model')
const authMiddleware = require('../Teacher/authMiddleware')

const router = new Router()
//getting all details of a students 
router.get('/student',(req,res) => {
    Student.findAll()
     .then(students => {
         res.json(students)
     })
     .catch(err => next(err))
})
//adding or creating students
router.post('/student',(req,res,next) =>{
    Student.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})
//getting student details based on student id and including class to see in which class student belonsg
router.get('/student/:id',(req,res,next) =>{
    Student.findByPk(req.params.id,{ include: [Class] })
    .then(student =>res.json(student))
    .catch(next)

})
//Update student details
router.put('/student/:id', (req, res, next) => {
    Student.findByPk(req.params.id)
        .then(student => {
            if (student) {
                return student.update(req.body)
                    .then(student => { res.json(student) })
            }
        })
        .catch(err => next(err))
})
//removing a student
router.delete('/student/:id', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.id,
        }
    })
        .then(numDeleted => {
            if (numDeleted) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
})

module.exports = router