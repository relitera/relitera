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
        const date = new Date(usuario.birthdate)

        let day = date.getDay()

        if (parseInt(day) < 10) {
            day = '0' + day
        }
        console.log(date)
        dataDeNascimentoText.textContent = `Data de nascimento: ${day}-${date.getMonth()}-${date.getFullYear()}`
    }
});