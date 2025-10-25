const botaoLogin = document.getElementById('login');

botaoLogin.addEventListener('click', function(){
    const email = document.getElementById('emailUsuario');
    const senha = document.getElementById('senhaUsuario');

    if ((email.value === "") || (senha.value === "")){
        if(email.value == ''){
            alert('Coloque um email válido');
        }else{
            alert('Coloque uma senha válida');
        }
    } else {
        const emailUsuario = email.value;
    const senhaUsuario = senha.value;

    email.value = '';
    senha.value = '';

    console.log(`Seu email: ${emailUsuario}`);
    console.log(`Sua senha: ${senhaUsuario}`);
    }
})
