const {DataTypes} = require('sequelize')
const db = require('../db/database')

const Paciente = db.define('paciente',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    nome_mae:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cartao_sus:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco:{
        type: DataTypes.STRING,
        allowNull:true
    }
})

module.exports = Paciente