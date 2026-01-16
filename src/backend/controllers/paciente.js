const modelPaciente = require('../models/paciente')
const modelConsulta = require('../models/consulta')
const { where } = require('sequelize')

class Paciente{
    // rota get listar
    async lista(req,res){
        try {
            const pacientes = await modelPaciente.findAll()
            return res.send(pacientes)
            return res.render('listagem-pacientes',{
                script:'listagem-pacientes.js',
                stylesheet:'listagem-pacientes.css',
                'pacientes': pacientes
            })

        } catch (error) {
            return res.status(500).send(`Erro interno ao puxar o usuario: ${error}`)
        }
        
    }

    // rota get formulario de Cadastro
    formCadastrar(req,res){
        try {
            return res.render('formCadastrar-paciente',{
                script:'formCadastrar-paciente.js',
                stylesheet: 'formCadastrar-paciente.css'
            })
        } catch (error) {
            return res.status(500).send(`Erro ao carregar o formulario!: ${error}`)
        }
        
    }

    //rota post cadastrar paciente
    async cadastrar(req,res){
        try {
            let nome = req.body.nome
            let data_nascimento = req.body.data_nascimento
            let nome_mae = req.body.nome_mae
            let cartao_sus = req.body.cartao_sus
            let cpf = req.body.cpf
            let endereco = req.body.endereco

            await modelPaciente.create({
                nome: nome,
                data_nascimento: data_nascimento,
                nome_mae: nome_mae,
                cartao_sus: cartao_sus,
                cpf: cpf,
                endereco: endereco
            })
            return res.redirect('/listaPacientes/')
        } catch (error) {
            return res.status(500).send(`Erro ao cadastrar paciente! : ${error}`)
        }
    }

    // rota get detalhes paciente
    async detalhes(req,res){
        try {
            const pacienteId = req.params.id
            const paciente = await modelPaciente.findOne({where:{'id':pacienteId}})
            const consultas = await modelConsulta.findAll({where:{'id_paciente':pacienteId}})
            const Quantidade_consultas = consultas.length
            return res.render('detalhes-paciente',{
                script:'detalhes-paciente.js',
                stylesheet:'detalhes-paciente.css',
                'quantidade_consultas':Quantidade_consultas,
                'paciente': paciente
            })
        } catch (error) {
            return res.status(500).send(`Erro ao exibir o paciente : ${error}`)
        }
    }

    // rota get consultas pacientes
    async consultas(req,res){
        try {
            const pacienteId = req.params.id
            const consultas = await modelConsulta.findAll({where:{'id_paciente': pacienteId}})
            const paciente = await modelPaciente.findOne({where:{'id': pacienteId}})
            return res.render('consultas-paciente',{
                script:'consultas-paciente.js',
                stylesheet:'consultas-paciente.css',
                'paciente': paciente,
                'consultas': consultas
            })
        } catch (error) {
            return res.status(500).send(`Erro ao exibir as consultas!: ${error}`)
        }
    
    }

    // rota get Formulario Editar Paciente
    async editar(req,res){
        try {
            const pacienteId = req.params.id
            const paciente = await modelPaciente.findOne({where:{'id': pacienteId}})
            return res.render('formEditar-paciente',{
                script:'formEditar-paciente.js',
                stylesheet:'formEditar-paciente.css',
                'paciente': paciente
            })
        } catch (error) {
            return res.status(500).send(`Erro ao editar paciente!: ${error}`)
        }
    }

    // rota put editar paciente
    async UpdatePaciente(req,res){
        try {
            let pacienteId = req.params.id
            let nome = req.body.nome
            let data_nascimento = req.body.data_nascimento
            let nome_mae = req.body.nome_mae
            let cartao_sus = req.body.cartao_sus
            let cpf = req.body.cpf
            let endereco = req.body.endereco

            await modelPaciente.update({
                nome: nome,
                data_nacimento: data_nascimento,
                nome_mae: nome_mae,
                cartao_sus: cartao_sus,
                cpf: cpf,
                endereco: endereco
            },{where:{'id': pacienteId}})

            return res.redirect('/listaPacientes/')
        } catch (error) {
            return res.status(500).send(`Erro ao editar o paciente! ${error}`)
        }
    }

    // rota delete paciente
    async deletar(req,res){
        try {
            const pacienteId = req.params.id
            await modelPaciente.destroy({where:{'id':pacienteId}})
            return res.redirect('/listaPacientes/')
        } catch (error) {
            return res.status(500).send(`Erro ao deletar Paciente: ${error}`)
        }
    }
}

module.exports = new Paciente()