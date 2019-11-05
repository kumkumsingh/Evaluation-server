const Teacher = require('./model')
const { toData } = require('./jwt')
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      try {
        const data = toData(auth[1])
        console.log('checking data',data)
        Teacher
          .findByPk(data.teacherId)
          .then(teacher => {
            if (!teacher) return next('teacher does not exist')
  
            req.teacher = teacher
            next()
          })
          .catch(next)
      }
      catch(error) {
        res.status(400).send({
          message: `Error ${error.name}: ${error.message}`,
        })
      }
    }
    else {
      res.status(401).send({
        message: 'Please supply some valid credentials'
      })
    }
  }
  
  module.exports = authMiddleware