const modelPaciente = require('../models/paciente')
const modelConsulta = require('../models/consulta')
const { where } = require('sequelize')

class Paciente{
    // rota get listar
    async lista(req,res){
        try {
            const pacientes = await modelPaciente.findAll()
            return res.render('paciente/listagem-pacientes',{
                script:'paciente/listagem-pacientes.js',
                stylesheet:'paciente/listagem-pacientes.css',
                'pacientes': pacientes
            })

        } catch (error) {
            return res.status(500).send(`Erro interno ao puxar o usuario: ${error}`)
        }
        
    }

    // rota get formulario de Cadastro
    formCadastrar(req,res){
        try {
            return res.render('paciente/formCadastrar-paciente',{
                script:'paciente/formCadastrar-paciente.js',
                stylesheet: 'paciente/formCadastrar-paciente.css'
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
            let sexo = req.body.sexo
            const paciente = await modelPaciente.findOne({where:{'cpf': cpf}})
            
            if(paciente){
                return res.render('paciente/formCadastrar-paciente',{
                script:'paciente/formCadastrar-paciente.js',
                stylesheet: 'paciente/formCadastrar-paciente.css',
                error:'Ja existe um paciente com o mesmo cpf!'
                })
            }else{
                    await modelPaciente.create({
                    nome: nome,
                    data_nascimento: data_nascimento,
                    nome_mae: nome_mae,
                    cartao_sus: cartao_sus,
                    cpf: cpf,
                    endereco: endereco,
                    sexo: sexo
                })
                return res.redirect('/paciente/')
            }
            
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
            const ultimaConsulta = await modelConsulta.findOne({
                where: { id_paciente: pacienteId },
                order: [['data_consulta', 'DESC']]
            })

            return res.render('paciente/detalhes-paciente',{
                script:'paciente/detalhes-paciente.js',
                stylesheet:'paciente/detalhes-paciente.css',
                'quantidade_consultas':Quantidade_consultas,
                'paciente': paciente,
                ultimaConsulta
            })
        } catch (error) {
            return res.status(500).send(`Erro ao exibir o paciente : ${error}`)
        }
    }

    // rota get consultas pacientes
    async consultas(req,res){
        try {
            const pacienteId = req.params.id
            const consultas = await modelConsulta.findAll({
                where: { id_paciente: pacienteId },
                include: [{ model: modelPaciente, as: 'paciente' }],
                order: [['data_consulta', 'DESC']]
            })
            const paciente = await modelPaciente.findOne({where:{'id': pacienteId}})
            return res.render('paciente/consultas-paciente',{
                script:'paciente/consultas-paciente.js',
                stylesheet:'paciente/consultas-paciente.css',
                'paciente': paciente,
                'consultas': consultas,
                'titulo':`Consultas de ${paciente.nome}`
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
            return res.render('paciente/formEditar-paciente',{
                script:'paciente/formEditar-paciente.js',
                stylesheet:'paciente/formEditar-paciente.css',
                'paciente': paciente
            })
        } catch (error) {
            return res.status(500).send(`Erro ao editar paciente!: ${error}`)
        }
    }

    // rota put editar paciente
    async UpdatePaciente(req,res){
        try {
            let pacienteId = parseInt(req.params.id)
            let nome = req.body.nome
            let data_nascimento = req.body.data_nascimento
            let nome_mae = req.body.nome_mae
            let cartao_sus = req.body.cartao_sus
            let cpf = req.body.cpf
            let endereco = req.body.endereco
            let sexo = req.body.sexo

            const newpaciente = await modelPaciente.update({
                nome: nome,
                data_nascimento: data_nascimento,
                nome_mae: nome_mae,
                cartao_sus: cartao_sus,
                cpf: cpf,
                endereco: endereco,
                sexo: sexo
            },{where:{'id': pacienteId}})

            return res.redirect('/paciente/')
        } catch (error) {
            return res.status(500).send(`Erro ao editar o paciente! ${error}`)
        }
    }

    // rota delete paciente
    async deletar(req,res){
        try {
            const pacienteId = parseInt(req.params.id)
            await modelPaciente.destroy({where:{'id':pacienteId}})
            return res.redirect('/paciente/')
        } catch (error) {
            return res.status(500).send(`Erro ao deletar Paciente: ${error}`)
        }
    }
}

module.exports = new Paciente()