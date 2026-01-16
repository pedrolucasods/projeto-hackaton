const {DataTypes} = require('sequelize')
const db = require('../db/database')

const Consulta = db.define('consulta',{
    id_paciente:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_consulta:{
        type: DataTypes.DATE,
        allowNull: false
    },
    motivo_vinda:{
        type: DataTypes.STRING
    },
    queixa_principal:{
        type: DataTypes.TEXT
    }
})

module.exports = Consulta