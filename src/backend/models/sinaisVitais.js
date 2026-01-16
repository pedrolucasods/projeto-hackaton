const {DataTypes} = require('sequelize')
const db = require('../db/database')

const SinaisVitais = db.define('sinais_vitais',{
    id_consulta:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sinal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    valor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    resultado:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = SinaisVitais