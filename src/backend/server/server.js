// app/server.js

//puxando dependencias
const express = require('express')
const path = require('path')
const db = require('../db/database')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const session = require('express-session')


// puxando a associação
const association = require('../associations/associations')


//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//config
// Configura Handlebars, public, etc.
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '../../frontend/views/layout'), 
  helpers: {  // adicionado helpers para eq e outros
    eq: (a, b) => a == b,
    ne: (a, b) => a != b,
    gt: (a, b) => a > b,
    lt: (a, b) => a < b,
    gte: (a, b) => a >= b,
    lte: (a, b) => a <= b,
    and: (a, b) => a && b,
    or: (a, b) => a || b,
    json: (context) => JSON.stringify(context)
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,}}))

  const Handlebars = require('handlebars');

// helper para comparar valores
  Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
  return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('eq', (a, b) => a === b);



// Config session
app.use(session({
  secret: 'segredo-super-seguro', // chave usada para assinar o cookie
  resave: false,                  // não salvar se nada mudou
  saveUninitialized: false,       // não criar sessão vazia
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}))

app.set('view engine', 'handlebars')


app.set('views', path.join(__dirname,'../../frontend/views'))
  
// Configurar cache para assets estáticos
const staticOptions = {
  maxAge: '1y', // Cache por 1 ano
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Cache mais longo para imagens
    if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Cache para CSS e JS
    else if (path.match(/\.(css|js)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
    // Cache para fontes
    else if (path.match(/\.(woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}

app.use(express.static(path.join(__dirname,'../../frontend/public'), staticOptions))


// Rotas
const RotaPaciente = require('../routes/paciente')
app.use('/paciente', RotaPaciente)

const RotaConsulta = require('../routes/consulta')
app.use('/consulta', RotaConsulta)

// home
const homeroute = require('../routes/homepage')
app.use('/',homeroute)



function startServer(port = 3000) {

  db.authenticate().then(function(){
    console.log('Banco de dados Sincronizado')
  }).catch(function(erro){
    console.log('erro : '+erro)
  })

  // db.sync({force:true}).then(function(){
  //   console.log('Table adicionada!')     //Criação de tabelas
  // })


  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Servidor Express rodando em http://localhost:${port}`);
      resolve(server);
    })

    server.on('error', reject)
  })
}

startServer()

module.exports = { startServer }