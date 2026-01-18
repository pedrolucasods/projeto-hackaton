// document.addEventListener("DOMContentLoaded", function () {
//   const btnPdf = document.querySelector(".btn-pdf");
//   if (btnPdf) {
//     btnPdf.addEventListener("click", function () {
//       const element = document.body;
//       const botoes = document.querySelector(".botoes-final");
//       if (botoes) botoes.style.display = "none";

//       const opt = {
//         margin: 0.5,
//         filename: `consulta_${new Date().toISOString().split("T")[0]}.pdf`,
//         image: { type: "jpeg", quality: 0.95 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
//       };
//       html2pdf().set(opt).from(element).save().then(() => {
//         if (botoes) botoes.style.display = "flex";
//       });
//     });
//   }
// });