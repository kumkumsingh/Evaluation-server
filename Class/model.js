
const Sequelize = require('sequelize')
const db = require('../db')

const Class = db.define('class', {

    classNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stDate: {
        type: Sequelize.STRING,
        allowNull: false
        
    },
    endDate: {
        type: Sequelize.STRING,
        allowNull: false
        
    }

})

module.exports = Class;