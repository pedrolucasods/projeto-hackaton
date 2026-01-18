const express = require('express')
const router = express.Router()
const ControllerConsulta = require('../controllers/consulta')

// rota listar consultas
router.get('/', ControllerConsulta.listar)

// rota triagem
router.get('/triagem', ControllerConsulta.triagem)

// rota motivo consulta
router.post('/motivoConsulta', ControllerConsulta.motivoConsulta)

// rota orientacao
router.post('/orientacao', ControllerConsulta.orientacao)

// rota cadastrar
router.post('/CadastrarConsulta', ControllerConsulta.cadastrarConsulta)

// rota resumo
router.get('/resumo/:id', ControllerConsulta.final)

module.exports = router