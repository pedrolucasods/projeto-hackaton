const {DataTypes, Model} = require('sequelize')
const db = require('../db/database')
const Consulta = require('./consulta')

const Orientacao = db.define('orientacao',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Consulta,
            key:'id'
        },
        onDelete:'CASCADE'
    },
    descricao:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Orientacao