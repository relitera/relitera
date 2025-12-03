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

  const botaoDeletarConta = document.getElementById("botaoExcluir");

  if (botaoDeletarConta) {
    botaoDeletarConta.addEventListener("click", () => {
      const deleteUser = async () => {
        const url = `http://localhost:8000/user/${userStore.user.email}`;

        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          console.log("Sucesso:", data);
          localStorage.removeItem("user-token");
            localStorage.removeItem("user");
            userStore.clearUser();
            window.location.href = "/minha-conta/login/";
        } catch (error) {
          console.error("Falha ao deletar usuário:", error);
        }
      };

      deleteUser();
    });
  }
});
