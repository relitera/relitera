const botaoApagar = document.getElementById("apagar");
const botaoRegistrar = document.getElementById("registrar");
const nome = document.getElementById('nomeUsuario');
const data = document.getElementById('nascimentoUsuario');
const email = document.getElementById('emailUsuario');
const senha = document.getElementById('passwordUsuario');
const alerta = document.getElementById('alerta');

email.addEventListener('focus', () => {
    email.classList.remove('ok');
    email.classList.remove('erro');
    email.classList.add('averiguando');
})

email.addEventListener('blur', () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    email.classList.remove('averiguando');

    const valido = regex.test(email.value.trim());
    email.classList.toggle("erro", !valido);
    email.classList.toggle("ok", valido);
    email.setAttribute("aria-invalid", String(!valido));
    
    botaoRegistrar.disabled = !valido;
})

senha.addEventListener('focus', () => {
    alerta.innerHTML = 'A senha deve possuir pelo menos 2 números, uma letra maiúscula e um caractere especial.';
    alerta.classList.add('alerta')
})

senha.addEventListener('blur', () => {
    alerta.innerHTML = '';
    alerta.classList.remove('alerta');
})

botaoRegistrar.addEventListener('click', function() {

    if((nome.value === '')||(data.value === '')||(email.value === '')||(senha.value === '')) {
        alert("Preencha todos requisitos");
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
})

botaoApagar.addEventListener('click', apagar);

function apagar() {

    nome.value = '';
    data.value = '';
    email.value = '';
    senha.value = '';
}

//A senha deve possuir pelo menos 2 números, uma letra maiúscula e um caractere especial.