import userStore from "../../store/UserStore/UserStore.js";
const botaoApagar = document.getElementById("apagar");
const botaoRegistrar = document.getElementById("registrar");
const nome = document.getElementById("nomeUsuario");
const data = document.getElementById("nascimentoUsuario");
const email = document.getElementById("emailUsuario");
const senha = document.getElementById("passwordUsuario");
const alerta = document.getElementById("alerta");

const getFormValues = () => {
    const nome = document.getElementById("nomeUsuario").value;
    const data = document.getElementById("nascimentoUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const senha = document.getElementById("passwordUsuario").value;

    return {
        name: nome,
        birthdate: data,
        email,
        password: senha
    }
}

email.addEventListener("focus", () => {
  email.classList.remove("ok");
  email.classList.remove("erro");
  email.classList.add("averiguando");
});

email.addEventListener("blur", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  email.classList.remove("averiguando");

  const valido = regex.test(email.value.trim());
  email.classList.toggle("erro", !valido);
  email.classList.toggle("ok", valido);
  email.setAttribute("aria-invalid", String(!valido));

  botaoRegistrar.disabled = !valido;
});

senha.addEventListener("focus", () => {
  alerta.innerHTML =
    "A senha deve possuir pelo menos 2 números, uma letra maiúscula e um caractere especial.";
  alerta.classList.add("alerta");
});

senha.addEventListener("blur", () => {
  alerta.innerHTML = "";
  alerta.classList.remove("alerta");
});
console.log(botaoRegistrar)

botaoRegistrar.addEventListener("click", async function () {
  try {
    console.log("registrando");

    const formData = getFormValues();

    console.log(formData)

    const feedbackMessage = document.getElementById("feedback-message")
    feedbackMessage.textContent = "Aguarde..."

    const newUser = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    feedbackMessage.textContent = ""

    const newUserRes = await newUser.json();

    const mensagemErroEl =  document.getElementById("error-message")

    if (!newUserRes) {
      mensagemErroEl.textContent = "Ocorreu um erro. Tente novamente mais tarde";
    }
    console.log(newUserRes);
    if (newUserRes.statusCode === 400) {
        mensagemErroEl.textContent = newUserRes.client_message

        return
    }

    if (newUserRes.id) {
        mensagemErroEl.style.display = "none"
        userStore.setUser(newUserRes)

        localStorage.setItem("user-token", newUserRes.token)
    
        setTimeout(() => {
            window.location.href = "/"
        }, 1000)
    }

    console.log(userStore.user)
  } catch (err) {
    const feedbackMessage = document.getElementById("feedback-message")

    const mensagemErroEl =  document.getElementById("error-message")

    mensagemErroEl.textContent = "Ocorreu um erro. Tente novamente mais tarde";
    feedbackMessage.textContent = ""
    console.error(err);
  }
});

botaoApagar.addEventListener("click", apagar);

function apagar() {
  nome.value = "";
  data.value = "";
  email.value = "";
  senha.value = "";
}
