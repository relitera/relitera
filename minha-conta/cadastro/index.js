//document.getElementById('registrar').onclick('regitrar()');
//document.getElementById('apagar').onclick('apagar()');

function registrar() {
    const nome = document.getElementById('nomeUsuario');
    const data = document.getElementById('nascimentoUsuario');
    const email = document.getElementById('emailUsuario');
    const senha = document.getElementById('passwordUsuario');

    if((nome.value === '')||(data.value === '')||(email.value === '')||(senha.value === '')) {
        if(nome.value === ''){
            alert("Coloque um nome válido!");
        } else {
            if(data.value === ''){
                alert("Coloque uma data válida!");
            } else {
                if(email.value === '') {
                    alert("Coloque um email válido!");
                } else{
                    alert("Coloque uma senha válida");
                }
            }
        }
    } else {
        const nomeUsuario = nome.value;
        const dataUsuario = data.value;
        const emailUsuario = email.value;
        const senhaUsuario = senha.value;

        console.log(nomeUsuario);
        console.log(dataUsuario);
        console.log(emailUsuario);
        console.log(senhaUsuario);
        apagar();
    }
}

function apagar() {
    const nome = document.getElementById('nomeUsuario');
    const data = document.getElementById('nascimentoUsuario');
    const email = document.getElementById('emailUsuario');
    const senha = document.getElementById('passwordUsuario');

    nome.value = '';
    data.value = '';
    email.value = '';
    senha.value = '';
}