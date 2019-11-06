const { Router } = require("express");
const Sequelize = require("sequelize");
const Student = require("./model");
const Batch = require("../Batch/model");
const authMiddleware = require("../User/authMiddleware");

const router = new Router();
//getting all details of a students
router.get("/student", (req, res, next) => {
  Student.findAll()
    .then(students => {
        console.log('checking color code',students.dataValues)
        
      res.json(students);
    })
    .catch(err => next(err));
});
//to get random record based on algorithm
router.get("/student/random", (req, res, next) => {
    Student.findOne({random:true})
    .then((student) => {
        res.json(student);
    });
  });
//{attributes: { include: [[Sequelize.fn('COUNT', Sequelize.col('lstCode')), 'no_lstCode']] }}
//adding or creating students
router.post("/student",authMiddleware, (req, res, next) => {
  Student.create(req.body)
    .then(data => res.json(data))
    .catch(next);
});
//getting student details based on student id and including Batch to see in which batch student belonsg
router.get("/student/:id", (req, res, next) => {
  Student.findByPk(req.params.id, { include: [Batch] })
    .then(student => res.json(student))
    .catch(next);
});
//Update student details
router.put("/student/:id", (req, res, next) => {
  Student.findByPk(req.params.id)
    .then(student => {
      if (student) {
        return student.update(req.body).then(student => {
          res.json(student);
        });
      }
    })
    .catch(err => next(err));
});
//removing a student
router.delete("/student/:id", (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.id
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
});

module.exports = router;
