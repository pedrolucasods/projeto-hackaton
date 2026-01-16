const {DataTypes} = require('sequelize')
const db = require('../db/database')
const Consulta = require('./consulta')

const Sintomas = db.define('sintomas',{
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
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Sintomas