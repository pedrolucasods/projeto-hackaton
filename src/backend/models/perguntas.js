const {DataTypes} = require('sequelize')
const db = require('../db/database')

const Perguntas = db.define('perguntas',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false
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