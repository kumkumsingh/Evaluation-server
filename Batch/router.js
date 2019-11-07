const { Router } =require('express')
const Batch = require('./model')
const Student = require('../Student/model')
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
router.post('/batch',authMiddleware,(req, res, next) => {
    Batch.create(req.body)
        .then(data => {
            console.log('cheking my data',data)
            res.json(data)
           
        })
        .catch(err => next(err))
})
// for getting details of students in a batch
router.get('/batch/:id', (request, response, next) => {
    console.log('checking inside batch/id',request.params.id)
    Batch.findByPk(request.params.id, { include: [Student] })
        .then(batch => response.send(batch))
        .catch(err => next(err))

})
//to get random record based on algorithm
router.get("/batch/random:id", (req, res, next) => {
    let randomNum = parseInt(Math.random() * 100);
    switch (true) {
      case randomNum > 0 && randomNum <= 50:
        randomCol = "RED";
        break;
  
      case randomNum >= 51 && randomNum <= 83:
        randomCol = "YELLOW";
        break;
      case randomNum >= 84 && randomNum <= 100:
        randomCol = "GREEN";
        break;
      default:
        break;
    }
    Student.findOne({
      attributes: ["id", "fullName", "imgUrl"],
      where: {
        lstCode: randomCol
      },
      order: [sequelize.fn("RANDOM")]
    }).then(student => {
      res.json([student]);
    });
  });

module.exports = router