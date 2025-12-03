import { isLogged } from "../store/UserStore/UserStore.js";

document.addEventListener("DOMContentLoaded", () => {
    if (!isLogged()) {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user");
        window.location.href = "/minha-conta/login/";
    }
})