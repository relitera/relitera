import userStore from "../../store/UserStore/UserStore.js";

const botaoLogin = document.getElementById("login");

const getFormValues = () => {
  const password = document.getElementById("senhaUsuario").value;
  const email = document.getElementById("emailUsuario").value;

  return {
    email: email,
    password: password,
  };
};

botaoLogin.addEventListener("click", async function () {
  try {
    console.log("loggandi");

    const feedbackMessage = document.getElementById("feedback-message");
    feedbackMessage.textContent = "Aguarde...";

    const formData = getFormValues();

    console.log(formData);

    const user = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    feedbackMessage.textContent = "";

    const userRes = await user.json();
    const mensagemErroEl = document.getElementById("error-message");

    if (!userRes) {
      mensagemErroEl.textContent =
        "Ocorreu um erro. Tente novamente mais tarde";
    }
    console.log(userRes);

    const mensagemSucessoEl = document.getElementById("success-message");

    if (userRes.statusCode === 400) {
      mensagemErroEl.textContent = userRes.server_message;
    }

    if (userRes.id) {
      mensagemErroEl.style.display = "none";
      userStore.setUser(userRes);

      localStorage.setItem("user-token", userRes.token);
      localStorage.setItem("user", JSON.stringify(userRes));

      setTimeout(() => {
        document.location.href = "/";
      }, 500);
    }

    console.log(userStore.user);
  } catch (err) {
    const mensagemErroEl = document.getElementById("error-message");
    mensagemErroEl.textContent = "Ocorreu um erro. Tente novamente mais tarde";

    feedbackMessage.textContent = "";
    alerta.innerHTML = "Ocorreu um erro. Tente novamente mais tarde";
    alerta.classList.remove("alerta");
    console.error(err);
  }
});
