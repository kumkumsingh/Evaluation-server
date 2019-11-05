
const Sequelize = require('sequelize')
const db = require('../db')

const Batch = db.define('batch', {

    batchNo: {
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

module.exports = Batch