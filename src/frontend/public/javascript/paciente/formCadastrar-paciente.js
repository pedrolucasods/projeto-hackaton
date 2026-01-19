document.addEventListener('DOMContentLoaded',()=>{
    // mascara cpf
    IMask(
        document.getElementById('cpf'),
        {
            mask: '000.000.000-00'
        }
    )

    // mascara cartao sus
    IMask(
        document.getElementById('cartao_sus'),
        {
            mask: '000 0000 0000 0000'
        }
    )

    const spancpf = document.getElementById('spancpf')

    const form = document.getElementById('form')
    form.addEventListener('submit', function(event){
        let cpf = document.getElementById('cpf').value
        if(!validaCPF(cpf)){
            spancpf.style.display = 'grid'
            spancpf.textContent = 'Erro, CPF inválido!'
            event.preventDefault()
        }
    })
    
})

function validaCPF(input) {
  if (input === null || input === undefined) return false;

  // transformar em string e limpar tudo que não é dígito
  const cpf = String(input).replace(/\D/g, '');

  // precisa ter 11 dígitos
  if (cpf.length !== 11) return false;

  // rejeita CPF com todos os dígitos iguais (ex: 00000000000, 11111111111, ...)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // converte para array de inteiros
  const nums = cpf.split('').map(d => parseInt(d, 10));

  // calcula dígito verificador 1
  let soma1 = 0;

  for (let i = 0; i < 9; i++) {
    // peso decrescente de 10 a 2
    soma1 += nums[i] * (10 - i);
  }
  const resto1 = soma1 % 11;
  const digito1 = (resto1 < 2) ? 0 : 11 - resto1;
  if (digito1 !== nums[9]) return false;

  // calcula dígito verificador 2
  let soma2 = 0;
  for (let i = 0; i < 10; i++) {
    // peso decrescente de 11 a 2 (inclui o primeiro dígito verificador)
    soma2 += nums[i] * (11 - i);
  }
  const resto2 = soma2 % 11;
  const digito2 = (resto2 < 2) ? 0 : 11 - resto2;
  if (digito2 !== nums[10]) return false;
  return true;
}
