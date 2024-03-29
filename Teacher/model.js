
const Sequelize = require('sequelize')
const db = require('../db')

const Teacher = db.define('teacher', {

    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Teacher;