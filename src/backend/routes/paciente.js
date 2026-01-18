const express = require('express')
const router = express.Router()
const ControllerPaciente = require('../controllers/paciente')

// rota listar pacientes
router.get('/', ControllerPaciente.lista)

// rota formulario cadastrar paciente
router.get('/cadastrar', ControllerPaciente.formCadastrar)

// rota cadastrar no banco
router.post('/cadastrar', ControllerPaciente.cadastrar)

// rota detalhes paciente
router.get('/detalhes/:id', ControllerPaciente.detalhes)

// rota consultas paciente
router.get('/consultas/:id', ControllerPaciente.consultas)

// rota formulario paciente
router.get('/editar/:id', ControllerPaciente.editar)

// rota editar paciente no banco
router.post('/editar/:id', ControllerPaciente.UpdatePaciente)

// rota deletar paciente
router.delete('/deletar/:id', ControllerPaciente.deletar)

module.exports = router