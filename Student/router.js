const { Router } = require("express");
const Student = require("./model");
const Batch = require("../Batch/model");
const authMiddleware = require("../User/authMiddleware");
const sequelize = require("sequelize");

const router = new Router();
const Op = sequelize.Op;
let redCount = 0;
//getting all details of students
router.get("/student", (req, res) => {
  Student.findAll()
    .then(students => {
      res.json(students);
    })
    .catch(err => next(err));
});
//getting all details of a students based on their last color code
router.get("/student/percentage/:id", (req, res, next) => {
  Student.findAll({
    attributes: [
      "lstCode",
      [sequelize.fn("COUNT", sequelize.col("lstCode")), "count"]
    ],
    where: {
      batchId: req.params.id
    },
    group: ["lstCode"]
  })
    .then(result => {
      let redPercent = 0;
      let redCount = 0;
      let greenPercent = 0;
      let greenCount = 0;
      let yellowPercent = 0;
      let yellowCount = 0;

      const totalCount = result.reduce((accumulator, currentvalue) => {
        switch (currentvalue.dataValues.lstCode) {
          case "RED":
            redCount = parseInt(currentvalue.dataValues.count);
            break;
          case "GREEN":
            greenCount = parseInt(currentvalue.dataValues.count);
            break;
          case "YELLOW":
            yellowCount = parseInt(currentvalue.dataValues.count);
            break;
          default:
            break;
        }
        return accumulator + parseInt(currentvalue.dataValues.count);
      }, 0);
      redPercent = (redCount / totalCount) * 100;
      greenPercent = (greenCount / totalCount) * 100;
      yellowPercent = (yellowCount / totalCount) * 100;

      res.json([redPercent, greenPercent, yellowPercent]);
    })
    .catch(err => next(err));
});
//to get random record based on algorithm
router.get("/student/random/:id", (req, res, next) => {
  
  Student.findAll({
    attributes: [
      "lstCode",
      [sequelize.fn("COUNT", sequelize.col("lstCode")), "count"]
    ],
    where: {
      batchId: req.params.id
    },
    group: ["lstCode"]
  })
    .then(result => {
      let redPercent = 0;
      let redCount = 0;
      let greenPercent = 0;
      let greenCount = 0;
      let yellowPercent = 0;
      let yellowCount = 0;

      const totalCount = result.reduce((accumulator, currentvalue) => {
        switch (currentvalue.dataValues.lstCode) {
          case "RED":
            redCount = parseInt(currentvalue.dataValues.count);
            break;
          case "GREEN":
            greenCount = parseInt(currentvalue.dataValues.count);
            break;
          case "YELLOW":
            yellowCount = parseInt(currentvalue.dataValues.count);
            break;
          default:
            break;
        }
        return accumulator + parseInt(currentvalue.dataValues.count);
      }, 0);
      redPercent = (redCount / totalCount) * 100;
      greenPercent = (greenCount / totalCount) * 100;
      yellowPercent = (yellowCount / totalCount) * 100;
  let colorFound = false;
  do {
  let randomNum = parseInt(Math.random() * 100);
  switch (true) {
    case ((randomNum > 0 && randomNum <= 50) && redCount > 0) :
      randomCol = "RED";
      colorFound = true;
      break;
    case ((randomNum >= 51 && randomNum <= 83) && yellowCount > 0 ):
      randomCol = "YELLOW";
      colorFound = true;
      break;
    case ((randomNum >= 84 && randomNum <= 100) && greenCount > 0) :
      randomCol = "GREEN";
      colorFound = true;
      break;
    default:
      break;
  }
} while(!colorFound);

  Student.findOne({
    attributes: ["id", "fullName", "imgUrl"],
    where: {
      lstCode: randomCol,
      batchId: req.params.id
    },
    order: [sequelize.fn("RANDOM")]
  }).then(student => {
    res.json([student]);
  });
});
});

router.post("/student", authMiddleware, (req, res, next) => {
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
    .catch(err => {
      console.log("error: ", err);
      next(err);
    });
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
