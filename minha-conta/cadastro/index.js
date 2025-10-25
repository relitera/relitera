const botaoApagar = document.getElementById("apagar");
const botaoRegistrar = document.getElementById("registrar");
const nome = document.getElementById('nomeUsuario');
const data = document.getElementById('nascimentoUsuario');
const email = document.getElementById('emailUsuario');
const senha = document.getElementById('passwordUsuario');

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

botaoRegistrar.addEventListener('click', function() {

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
})

botaoApagar.addEventListener('click', apagar);

function apagar() {

    nome.value = '';
    data.value = '';
    email.value = '';
    senha.value = '';
}