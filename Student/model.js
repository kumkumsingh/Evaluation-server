const Sequelize = require("sequelize");
const Batch = require("../Batch/model");
const db = require("../db");

const Student = db.define("student", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lstCode: {
    type: Sequelize.STRING
  },
  lstUpdateDate: {
    type: Sequelize.STRING
  }
});
Student.belongsTo(Batch, { onDelete: "CASCADE" });
Batch.hasMany(Student ,{onDelete:'CASCADE'});
module.exports = Student;
