
const Sequelize = require('sequelize')
const db = require('../db')

const Batch = db.define('batch', {

    batchNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stDate: {
        type: Sequelize.DATE,
        allowNull: false
        
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
        
    }

})

module.exports = Batch