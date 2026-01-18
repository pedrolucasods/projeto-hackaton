function say_hi(){
    alert('Ola botão, do olá1')
}

function cadastrarPaciente(){
    window.location.href = '/paciente/cadastrar'
}

function listagem(){
    let tipo_consulta = document.getElementById('dados').value
    if(tipo_consulta == 'pacientes'){
        window.location.href = '/paciente/'
    }else if(tipo_consulta == 'consultas'){
        window.location.href = '/consulta/'
    }
}

function formTriagem(){
    window.location.href = '/consulta/triagem'
}