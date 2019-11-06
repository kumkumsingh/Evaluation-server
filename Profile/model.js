const Sequelize = require("sequelize");
const Student = require("../Student/model");
const db = require("../db");

const Profile = db.define("profile", {
  remarks: {
    type: Sequelize.STRING,
    allowNull: false
  },
  colorCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  UpdatedDate: {
    type: Sequelize.DATE,
    allowNull: false,
    primaryKey: true,
  }
});
Profile.belongsTo(Student, { onDelete: "CASCADE" });
Student.hasOne(Profile);
module.exports = Profile;
