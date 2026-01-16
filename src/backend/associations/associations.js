// associação dos models
const Paciente = require('../models/paciente');
const Consulta = require('../models/consulta');
const SinaisVitais = require('../models/sinaisVitais');
const Perguntas = require('../models/perguntas');
const Sintomas = require('../models/sintomas');
const Orientacao = require('../models/orientacao');


// paciente 1:N Consulta
Paciente.hasMany(Consulta, { foreignKey: 'id_paciente' });
Consulta.belongsTo(Paciente, { foreignKey: 'id_paciente' });

// consulta 1:N SinaisVitais
Consulta.hasMany(SinaisVitais, { foreignKey: 'id_consulta' });
SinaisVitais.belongsTo(Consulta, { foreignKey: 'id_consulta' });

// consulta 1:N Perguntas
Consulta.hasMany(Perguntas, { foreignKey: 'id_consulta' });
Perguntas.belongsTo(Consulta, { foreignKey: 'id_consulta' });

// consulta 1:N Sintomas
Consulta.hasMany(Sintomas, { foreignKey: 'id_consulta' });
Sintomas.belongsTo(Consulta, { foreignKey: 'id_consulta' });

// consulta 1:N Orientacao
Consulta.hasMany(Orientacao, { foreignKey: 'id_consulta' });
Orientacao.belongsTo(Consulta, { foreignKey: 'id_consulta' });