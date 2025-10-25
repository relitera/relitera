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

    const newUser = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const newUserRes = await newUser.json();

    if (!newUserRes) return
    console.log(newUserRes);
    if (newUserRes.statusCode === 400) {
        alerta.innerHTML = newUserRes.client_message;
        alerta.classList.remove("alerta");

        return
    }

    if (newUserRes.id) {
        userStore.setUser(newUserRes)

        localStorage.setItem("user-token", newUserRes.token)
    
        alerta.innerHTML = "Conta criada com sucesso, aguarde enquanto te redirecionamos na página principal";
        alerta.classList.remove("alerta");

        setTimeout(() => {
            window.location.href = "/"
        }, 1000)
    }

    console.log(userStore.user)
  } catch (err) {
    alerta.innerHTML = "Ocorreu um erro. Tente novamente mais tarde";
    alerta.classList.remove("alerta");
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
