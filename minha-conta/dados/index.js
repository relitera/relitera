import userStore from "../../store/UserStore/UserStore.js";
import { isLogged } from "../../store/UserStore/UserStore.js";

document.addEventListener("DOMContentLoaded", () => {
    if (!isLogged()) {
        localStorage.removeItem("user");
        localStorage.removeItem("user-token");
        window.location.href = "/minha-conta/login/";
        return;
    }

    const nomeUsuarioText = document.getElementById("nome-usuario")
    const emailUsuarioText = document.getElementById("email-usuario")
    const dataDeNascimentoText = document.getElementById("data-de-nascimento")

    const usuario = userStore.user

    if (!usuario) return

    if (usuario.name) {
        nomeUsuarioText.textContent = `Nome: ${usuario.name}`
    }

    if (usuario.email) {
        emailUsuarioText.textContent = `Email: ${usuario.email}`
    }

    if (usuario.birthdate) {
        console.log(usuario.birthdate);
        const date = new Date(usuario.birthdate);

        let day = date.getUTCDate(); 
        
        let month = date.getUTCMonth() + 1; 

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        const year = date.getUTCFullYear();

        dataDeNascimentoText.textContent = `Data de nascimento: ${day}-${month}-${year}`;
    }
});