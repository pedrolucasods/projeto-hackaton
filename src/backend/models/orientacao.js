const {DataTypes, Model} = require('sequelize')
const db = require('../db/database')
const Consulta = require('../models/consulta')

const Orientacao = db.define('orientacao',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'consulta',
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