const {Router} = require('express')
const Teacher = require('./model')
const bcrypt = require('bcrypt')
const { toJWT, toData} = require('./jwt')
const authMiddleware = require('./authMiddleware')

const router = new Router()

router.get('/secret-endpoint', authMiddleware, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.teacher.email}.`,
    })
  })
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
  router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
  
    if (!email || !password) {
      res.status(400).send({
        message: 'Please supply a valid email and password'
      })
    }
    else {
    Teacher  
    .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist'
          })
        }
    
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
    
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ teacherId: entity.id })
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
    }
  })

  module.exports = router