const modelConsulta = require('../models/consulta')
const modelPaciente = require('../models/paciente')

class homepage{
    async home(req,res){
        const Consultas = await modelConsulta.findAll()
        const Pacientes = await modelPaciente.findAll()
        const quantidadePaciente = Pacientes.length
        const quantidadeConsulta = Consultas.length
        return res.render('homepage/homepage',{
            script:'homepage/homepage.js',
            stylesheet:'homepage/homepage.css',
            'consultas': quantidadeConsulta,
            'pacientes':quantidadePaciente
        })
    }
}

module.exports = new homepage()