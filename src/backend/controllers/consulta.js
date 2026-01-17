const modelPaciente = require('../models/paciente')
const modelConsulta = require('../models/consulta')
const modelSintomas = require('../models/sintomas')
const modelSinaisVitais = require('../models/sinaisVitais')
const modelOrientacao = require('../models/orientacao')
const modelPerguntas = require('../models/perguntas')

class Consulta{

    // rota get listar consultas
    async listar(req,res){
        try {
            const consultas = await modelConsulta.findAll()
            return res.send(consultas)
            return res.render('listagem-consulta',{
                script:'listagem-consulta.js',
                stylesheet
            })
        } catch (error) {
            return res.status(500).send(`Erro ao listar as consultas: ${error}`)
        }
        
    }

    // rota get iniciar consulta/triagem (1º parte da consulta)
    async triagem(req,res){
        try {
            const pacientes = await modelPaciente.findAll()
            return res.render('formTriagem',{
                script:'formTriagem.js',
                stylesheet:'formTriagem.css',
                'pacientes':pacientes
            })
        } catch (error) {
            return res.status(500).send(`Erro ao iniciar a triagem: ${error}`)
        }
    }

    // rota post entrevista/motivo consulta (2º parte da consulta)
    async motivoConsulta(req,res){
        try {
            let SinaisVitais = JSON.parse(req.body.sinaisVitais)
            let pacienteId = req.body.pacienteId
            const agora = new Date()
            const dataFormatada = agora.toISOString().split('T')[0]
            let DadosConsulta = { id: pacienteId, data_consulta :dataFormatada, sinaisVitais: SinaisVitais };
            return res.render('formOrientacao',{
                script:'formOrientacao.js',
                stylesheet:'formOrientacao.css',
                'dadosConsulta': DadosConsulta
            })

        } catch (error) {
            return res.status(500).send(`Erro ao carregar a tela: ${error}`)
        }
    }

    // rota post orientacao (3º parte da consulta e ultima)
    async orientacao(req,res){
        try {
            let motivoVinda = req.body.motivoVinda
            let queixaPrincipal = req.body.queixaPrincipal
            let perguntasConsulta = JSON.parse(req.body.perguntasConsulta)
            let sintomasConsulta = JSON.parse(req.body.sintomas)
            let dadosConsulta = JSON.parse(req.body.dadosConsulta)
            //adicionando o restante
            dadosConsulta.perguntas = perguntasConsulta
            dadosConsulta.sintomas = sintomasConsulta
            dadosConsulta.queixaPrincipal = queixaPrincipal
            dadosConsulta.motivoVinda = motivoVinda
            return res.render('formOrientacao',{
                script:'formOrientacao.js',
                stylesheet:'formOrientacao.css',
                'dadosConsulta':dadosConsulta
            })
        } catch (error) {
            return res.status(500).send(`Erro ao carregar a tela: ${error}`)
        }
    }

    // rota cadastrar a consulta, orientacao, perguntas e sintomas
    async cadastrarConsulta(req,res){
        try {
            let dadosConsulta = JSON.parse(req.body.dadosConsulta)
            // Cadastrando a consulta
            const Consulta = await modelConsulta.create({
                id_paciente: dadosConsulta.id,
                data_consulta: dadosConsulta.data_consulta,
                motivo_vinda: dadosConsulta.motivoVinda,
                queixa_principal: dadosConsulta.queixaPrincipal
            })

            // Cadastrando os sinais vitais
            for(const sv of dadosConsulta.sinaisVitais){
                await modelSinaisVitais.create({
                    id_consulta: Consulta.id,
                    sinal: sv.sinal,
                    valor: sv.valor,
                    resultado: sv.resultado
                })
            }

            // Cadastrando os sintomas
            for(const si of dadosConsulta.sintomas){
                const Sintomas = await modelSintomas.create({
                    id_consulta: Consulta.id,
                    descricao: si.descricao
                })
            }

            // Cadastrando pergunta e respostas
            for(const pr of dadosConsulta.perguntas){
                const Perguntas = await modelPerguntas.create({
                    id_consulta: Consulta.id,
                    pergunta: pr.pergunta,
                    resposta: pr.resposta
                })
            }

            // Cadastrando a Orientacao
            const Orientacao  = await modelOrientacao.create({
                id_consulta: Consulta.id,
                descricao: req.body.descricao
            })

            return res.render('tela-finalConsulta',{
                script:'tela-finalConsulta.js',
                stylesheet:'tela-finalConsulta.css'
            })
        } catch (error) {
            return res.status(500).send(`Erro ao cadastradar a consulta: ${error}`)
        }
        

    }

}

module.exports = new Consulta()