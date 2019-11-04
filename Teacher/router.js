const {Router} = require('express')
const Teacher = require('./model')
const bcrypt = require('bcrypt')
const { toJWT, toData} = require('./jwt')

const router = new Router()

router.post('/signup', (req, res) => {
    const name =  req.body.name
    const email = req.body.email
    const password = req.body.password
  
    if (!email || !password || !name) {
        res.status(400).send({
            message: 'Please fill out all details'
        })
    } else {
        Teacher.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
            .then((user) => {
                res.status(200).send({
                    status: "Your SignUp is successful!!"
                })
            })
    }
  })

  module.exports = router