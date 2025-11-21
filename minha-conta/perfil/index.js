import userStore from "../../store/UserStore/UserStore.js";

const botaoSair = document.getElementById("botaoSair");

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user");
    userStore.clearUser();
    window.location.href = "/minha-conta/login/";
})