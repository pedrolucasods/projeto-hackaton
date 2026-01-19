function say_hi(){
    alert('Ola botão, do olá1')
}

function cadastrarPaciente(){
    window.location.href = '/paciente/cadastrar'
}


function listarPaciente(){
    window.location.href = '/paciente/'
}

function listarConsulta(){
    window.location.href = '/consulta/'
}
function formTriagem(){
    window.location.href = '/consulta/triagem'
}

document.addEventListener("DOMContentLoaded", () => {
  const peso = document.getElementById("peso")
  const altura = document.getElementById("altura")
  const resultadoImc = document.getElementById("resultado-imc")

  function calcularIMC() {
    if (peso.value && altura.value) {
      const imc = (peso.value / (altura.value * altura.value)).toFixed(2)
      let status = ""
      if (imc < 18.5) status = "Abaixo do peso"
      else if (imc < 25) status = "Normal"
      else if (imc < 30) status = "Sobrepeso"
      else status = "Obesidade"
      resultadoImc.textContent = `Resultado: ${imc} (${status})`
    }
  }
  peso.addEventListener("input", calcularIMC)
  altura.addEventListener("input", calcularIMC)

  const sistolica = document.getElementById("sistolica")
  const diastolica = document.getElementById("diastolica")
  const resultadoPressao = document.getElementById("resultado-pressao")

  function avaliarPressao() {
    if (sistolica.value && diastolica.value) {
      const sis = parseInt(sistolica.value)
      const dia = parseInt(diastolica.value)
      let status = ""
      if (sis < 120 && dia < 80) status = "Normal"
      else if (sis < 140 || dia < 90) status = "Pré-hipertensão"
      else status = "Hipertensão"
      resultadoPressao.textContent = `Resultado: ${sis}/${dia} mmHg (${status})`
    }
  }
  sistolica.addEventListener("input", avaliarPressao)
  diastolica.addEventListener("input", avaliarPressao)

  const glicemia = document.getElementById("glicemia")
  const resultadoGlicemia = document.getElementById("resultado-glicemia")

  glicemia.addEventListener("input", () => {
    if (glicemia.value) {
      const valor = parseInt(glicemia.value)
      let status = ""
      if (valor < 70) status = "Hipoglicemia"
      else if (valor <= 99) status = "Normal"
      else if (valor <= 125) status = "Pré-diabetes"
      else status = "Diabetes"
      resultadoGlicemia.textContent = `Resultado: ${valor} mg/dL (${status})`
    }
  })
})
