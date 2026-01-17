const Sequelize = require('sequelize')
const path = require('path')
const { logger } = require('sequelize/lib/utils/logger')
require('dotenv').config()
const db = new Sequelize(
    'sistema_enfermagem',
    'root',
    'VoucherDev@2024',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        logging: false
    }
)

module.exports = db