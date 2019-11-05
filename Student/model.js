const Sequelize = require('sequelize')
const Class = require('../Class/model')
const db = require('../db')

const Student = db.define('student', {

    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lstCode: {
        type: Sequelize.STRING,
        
    },
    lstUpdateDate: {
        type: Sequelize.STRING,
        
    }

})
Student.belongsTo(Class,{onDelete:'CASCADE'})
Class.hasMany(Student)
module.exports = Student;