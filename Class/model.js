
const Sequelize = require('sequelize')
const db = require('../db')

const Class = db.define('class', {

    classNo: {
        type: Sequelize.STRING
    },
    stDate: {
        type: Sequelize.STRING,
        
    },
    endDate: {
        type: Sequelize.STRING,
        
    }

})

module.exports = Class;