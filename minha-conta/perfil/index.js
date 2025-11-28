import userStore from "../../store/UserStore/UserStore.js";
import { isLogged } from "../../store/UserStore/UserStore.js";

document.addEventListener("DOMContentLoaded", () => {
    if (!isLogged()) {
        localStorage.removeItem("user");
        localStorage.removeItem("user-token");
        window.location.href = "/minha-conta/login";
        return;
    }
    const botaoSair = document.getElementById("botaoSair");

    if (botaoSair) {
        botaoSair.addEventListener("click", () => {
            localStorage.removeItem("user-token");
            localStorage.removeItem("user");
            userStore.clearUser();
            window.location.href = "/minha-conta/login/";
        });
    }
});