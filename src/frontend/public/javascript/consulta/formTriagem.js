function atualizarStatus(id, texto) {
  document.getElementById(id).textContent = texto;
}

// --- IMC ---
function calcularIMC() {
  const altura = parseFloat(document.getElementById("altura").value) / 100;
  const peso = parseFloat(document.getElementById("peso").value);
  if (!isNaN(altura) && !isNaN(peso) && altura > 0) {
    const imc = peso / (altura * altura);
    let resultado;
    if (imc < 18.5) resultado = "abaixo do peso";
    else if (imc < 25) resultado = "normal";
    else if (imc < 30) resultado = "sobrepeso";
    else resultado = "obesidade";
    atualizarStatus("imc-status", `IMC: ${imc.toFixed(2)} (${resultado})`);
    return { sinal: "IMC", valor: imc.toFixed(2), resultado };
  }
  return null;
}

// --- Pressão ---
function avaliarPressao() {
  const sistolica = parseInt(document.getElementById("pressao_sistolica").value);
  const diastolica = parseInt(document.getElementById("pressao_diastolica").value);
  if (!isNaN(sistolica) && !isNaN(diastolica)) {
    let resultado;
    if (sistolica < 90 || diastolica < 60) resultado = "baixa";
    else if (sistolica <= 120 && diastolica <= 80) resultado = "normal";
    else resultado = "alta";
    atualizarStatus("pressao-status", `Pressão: ${sistolica}/${diastolica} (${resultado})`);
    return { sinal: "Pressão", valor: `${sistolica}/${diastolica}`, resultado };
  }
  return null;
}

// --- Frequência Cardíaca ---
function avaliarFrequencia() {
  const bpm = parseInt(document.getElementById("frequencia").value);
  if (!isNaN(bpm)) {
    let resultado;
    if (bpm < 60) resultado = "bradicardia";
    else if (bpm <= 100) resultado = "normal";
    else resultado = "taquicardia";
    atualizarStatus("frequencia-status", `Frequência: ${bpm} bpm (${resultado})`);
    return { sinal: "Frequência Cardíaca", valor: bpm.toString(), resultado };
  }
  return null;
}

// --- Temperatura ---
function avaliarTemperatura() {
  const temp = parseFloat(document.getElementById("temperatura").value);
  if (!isNaN(temp)) {
    let resultado;
    if (temp < 36) resultado = "hipotermia";
    else if (temp <= 37.5) resultado = "normal";
    else resultado = "febre";
    atualizarStatus("temperatura-status", `Temperatura: ${temp} °C (${resultado})`);
    return { sinal: "Temperatura", valor: temp.toString(), resultado };
  }
  return null;
}

// --- Glicemia ---
function avaliarGlicemia() {
  const glicemia = parseInt(document.getElementById("glicemia").value);
  if (!isNaN(glicemia)) {
    let resultado;
    if (glicemia < 70) resultado = "hipoglicemia";
    else if (glicemia <= 100) resultado = "normal";
    else resultado = "hiperglicemia";
    atualizarStatus("glicemia-status", `Glicemia: ${glicemia} mg/dL (${resultado})`);
    return { sinal: "Glicemia", valor: glicemia.toString(), resultado };
  }
  return null;
}

// --- Eventos em tempo real ---
document.getElementById("altura").addEventListener("input", calcularIMC);
document.getElementById("peso").addEventListener("input", calcularIMC);
document.getElementById("pressao_sistolica").addEventListener("input", avaliarPressao);
document.getElementById("pressao_diastolica").addEventListener("input", avaliarPressao);
document.getElementById("frequencia").addEventListener("input", avaliarFrequencia);
document.getElementById("temperatura").addEventListener("input", avaliarTemperatura);
document.getElementById("glicemia").addEventListener("input", avaliarGlicemia);

// --- Envio formatado ---
document.getElementById("form-triagem").addEventListener("submit", function () {
  const pacienteId = document.getElementById("pacienteId").value;
  const hoje = new Date().toISOString().split("T")[0];

  const imc = calcularIMC();
  const pressao = avaliarPressao();
  const freq = avaliarFrequencia();
  const temp = avaliarTemperatura();
  const glicemia = avaliarGlicemia();

  const sinaisVitais = [];
  if (imc) sinaisVitais.push(imc);
  if (pressao) sinaisVitais.push(pressao);
  if (freq) sinaisVitais.push(freq);
  if (temp) sinaisVitais.push(temp);
  if (glicemia) sinaisVitais.push(glicemia);

  const dadosConsulta = {
    pacienteId: parseInt(pacienteId),
    data_consulta: hoje,
    motivo_vinda: "", 
    queixa_principal: "", 
    sinaisVitais
  };

  sessionStorage.setItem("dadosConsulta", JSON.stringify(dadosConsulta));
  document.getElementById("sinaisVitais").value = JSON.stringify(sinaisVitais);
});
