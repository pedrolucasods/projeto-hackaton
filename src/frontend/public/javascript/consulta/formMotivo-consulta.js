function adicionarPergunta() {
  const container = document.getElementById("perguntas");
  const div = document.createElement("div");
  div.className = "pergunta";
  div.innerHTML = `
    <label>Pergunta:</label>
    <input type="text" name="pergunta">
    <label>Resposta:</label>
    <input type="text" name="resposta">
  `;
  container.insertBefore(div, container.lastElementChild);
}

function adicionarSintoma() {
  const container = document.getElementById("sintomas");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "sintoma";
  input.placeholder = "Descreva o sintoma";
  container.insertBefore(input, container.lastElementChild);
}

document.getElementById("form-motivo").addEventListener("submit", function () {
  const perguntas = [];
  document.querySelectorAll("#perguntas .pergunta").forEach(p => {
    // pega o texto da pergunta (se tiver name=pergunta usa, senão pega o primeiro input de texto)
    const perguntaInput = p.querySelector("input[name='pergunta']") || p.querySelector("input[type='text']");
    const pergunta = perguntaInput ? perguntaInput.value : "";
    const resposta = p.querySelector("input[name='resposta']")?.value || "";
    if (pergunta && resposta) {
      perguntas.push({ pergunta, resposta });
    }
  });

  const sintomas = [];
  document.querySelectorAll("input[name='sintoma']").forEach(s => {
    if (s.value.trim()) {
      sintomas.push({ descricao: s.value.trim() });
    }
  });

  const motivoVinda = document.getElementById("motivoVinda")?.value || "";
  const queixaPrincipal = document.getElementById("queixaPrincipal")?.value || "";

  let dadosConsulta = {};
  try {
    dadosConsulta = JSON.parse(sessionStorage.getItem("dadosConsulta") || "{}");
  } catch {
    dadosConsulta = {};
  }

  // atualiza objeto
  dadosConsulta.motivo_vinda = motivoVinda;
  dadosConsulta.queixa_principal = queixaPrincipal;
  dadosConsulta.perguntas = perguntas;
  dadosConsulta.sintomas = sintomas;

  // salva para próxima tela
  sessionStorage.setItem("dadosConsulta", JSON.stringify(dadosConsulta));

  // joga nos hidden para backend
  document.getElementById("perguntasConsulta").value = JSON.stringify(perguntas);
  document.getElementById("sintomasConsulta").value = JSON.stringify(sintomas);
  document.getElementById("dadosConsulta").value = JSON.stringify(dadosConsulta);
});
