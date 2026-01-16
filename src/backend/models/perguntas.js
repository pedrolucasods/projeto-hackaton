const {DataTypes} = require('sequelize')
const db = require('../db/database')
const Consulta = require('./consulta.js')

const Perguntas = db.define('perguntas',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'consulta',
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

module.exports = Perguntas