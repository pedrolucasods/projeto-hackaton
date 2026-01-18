document.getElementById("form-orientacao").addEventListener("submit", function () {
  let dadosConsulta = {}
  try {
    dadosConsulta = JSON.parse(sessionStorage.getItem("dadosConsulta") || "{}")
  } catch {
    dadosConsulta = {}
  }

  const descricao = document.getElementById("descricao").value
  dadosConsulta.orientacoes = [{ descricao }]

  sessionStorage.setItem("dadosConsulta", JSON.stringify(dadosConsulta))
  document.getElementById("dadosConsulta").value = JSON.stringify(dadosConsulta)
})
