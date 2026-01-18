document.addEventListener("DOMContentLoaded", () => {
  const campoBusca = document.getElementById("campoBusca");
  const cards = document.querySelectorAll(".consulta-card");

  campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();

    cards.forEach(card => {
      const texto = card.innerText.toLowerCase();
      if (texto.includes(termo)) {
        card.style.display = "block"; // mostra
      } else {
        card.style.display = "none"; // esconde
      }
    });
  });
});
