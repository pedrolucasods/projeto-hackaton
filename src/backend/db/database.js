const Sequelize = require('sequelize')
const path = require('path')
const { logger } = require('sequelize/lib/utils/logger')
require('dotenv').config()
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
)

module.exports = db