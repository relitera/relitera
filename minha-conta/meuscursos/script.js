import cartStore from "../../store/CartStore/CartStore.js";
import userStore from "../../store/UserStore/UserStore.js";
import { isLogged } from "../../store/UserStore/UserStore.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    if (!isLogged()) {
      localStorage.removeItem("user");
      localStorage.removeItem("user-token");
      window.location.href = "/minha-conta/login";
      return;
    }
    const userId = userStore.user.id

    if (!userId) return false

    const coursesGet = await fetch(
      `https://relitera-api.onrender.com/courses/user?user_id=${userId}`,
        {
          method: "GET",
        }
    );

    console.log(coursesGet);

    const coursesRes = await coursesGet.json();
    console.log(coursesRes);

    const productsGrid = document.getElementById("products-grid-id");

    if (coursesRes && Array.isArray(coursesRes)) {
      const feedbackCarregamentoDiv = document.getElementById(
          "feedback-carregamento"
        );

      feedbackCarregamentoDiv.style.display = "None";

      coursesRes.forEach((course) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productTitle = document.createElement("h3");
        productTitle.className = "product-title";
        productTitle.textContent = course.name;

        const productImageContainer = document.createElement("div");
        productImageContainer.className = "product-image";

        const productImage = document.createElement("img");
        productImage.src =
          course.thumb_url ||
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
        productImage.alt = course.name;

        productImageContainer.appendChild(productImage);

        const productButtonsContainer = document.createElement("div");
        productButtonsContainer.className = "product-buttons";

        const buttonId = `${course.name.toLowerCase().replace(/\s+/g, "-")}-btn`;
        const continueToWatch = document.createElement("button");
        continueToWatch.id = buttonId;
        continueToWatch.className = "btn-continue-watch";
        continueToWatch.textContent = "Assistir";

        continueToWatch.addEventListener("click", () => {
          window.location.href = `${window.location.origin}/plataforma/course.html?course_id=${course.id}&course_name=${course.name}`;
        })
      
        productButtonsContainer.appendChild(continueToWatch);

        productCard.appendChild(productTitle);
        productCard.appendChild(productImageContainer);
        productCard.appendChild(productButtonsContainer);

        productsGrid.appendChild(productCard);
      });
    } else {
      const feedbackCarregamentoText = document.getElementById(
      "feedback-carregamento-texto"
      );

      feedbackCarregamentoText.textContent = "Um erro ocorreu. Tente novamente mais tarde."
      feedbackCarregamentoText.style.color = "red"
    }

    const menuToggle = document.querySelector(".menu-toggle");

    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        alert("Menu será implementado em breve!");
      });
    }

    const sobreButtons = document.querySelectorAll(".btn-sobre");
    const comprarButtons = document.querySelectorAll(".btn-comprar");

    const closeInfoButton = document.getElementById("closeModalBtn");
    closeInfoButton.addEventListener("click", function () {
      const descricaoContainer = document.getElementById("info-curso-container");
      descricaoContainer.style.display = "none";
    });

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    productCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  } catch(err) {
    console.log(err);
    const feedbackCarregamentoText = document.getElementById(
      "feedback-carregamento-texto"
    );

    feedbackCarregamentoText.textContent = "Um erro ocorreu. Tente novamente mais tarde."
    feedbackCarregamentoText.style.color = "red"
  }
});
