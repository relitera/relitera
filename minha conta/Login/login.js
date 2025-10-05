function Registrar() {
    const email = document.getElementById('emailUsuario');
    const senha = document.getElementById('senhaUsuario');

    const emailUsuario = email.value;
    const senhaUsuario = senha.value;

    email.value = '';
    senha.value = '';

    console.log(`Seu email: ${emailUsuario}`);
    console.log(`Sua senha: ${senhaUsuario}`);
}