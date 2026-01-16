const {DataTypes} = require('sequelize')
const db = require('../db/database')

const Sintomas = db.define('sintomas',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Sintomas