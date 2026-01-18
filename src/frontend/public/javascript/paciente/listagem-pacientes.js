document.addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.getElementById("busca");
    const cards = document.querySelectorAll(".paciente-card");

    // 🔍 Busca dinâmica por nome ou CPF
    campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase().trim();

    cards.forEach(card => {
        const texto = card.innerText.toLowerCase();
        card.style.display = texto.includes(termo) ? "flex" : "none";
    });
    });

    // ➕ Cadastrar paciente
    window.cadastrarPaciente = function () {
    window.location.href = "/paciente/cadastrar";
    };

    

    // ❌ Exclusão com fetch DELETE
    document.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", async () => {
        const card = btn.closest(".paciente-card");
        const pacienteId = card.getAttribute("data-id");

        if (confirm("Tem certeza que deseja excluir este paciente?")) {
        try {
            const response = await fetch(`/paciente/deletar/${pacienteId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
            });
            window.location.href = '/paciente/'

        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Erro na comunicação com o servidor.");
        }
        }
    });
    });
});


function editar(id){
        window.location.href = `/paciente/editar/${id}`
    }

function consultas(id){
    window.location.href = `/paciente/consultas/${id}`
}

function Perfil(id){
    window.location.href = `/paciente/detalhes/${id}`
}