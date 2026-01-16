const {DataTypes} = require('sequelize')
const db = require('../db/database')

const Orientacao = db.define('orientacao',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Orientacao