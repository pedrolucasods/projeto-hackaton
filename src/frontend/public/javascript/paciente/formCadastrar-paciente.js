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

    
})