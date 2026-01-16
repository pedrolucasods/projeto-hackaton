const {DataTypes} = require('sequelize')
const db = require('../db/database')
const Consulta = require('./consulta')

const Perguntas = db.define('perguntas',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Consulta,
            key:'id'
        },
        onDelete:'CASCADE'
    },
    pergunta:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    reposta:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})