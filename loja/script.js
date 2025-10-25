document.addEventListener("DOMContentLoaded", async function () {
  const coursesGet = await fetch("http://localhost:8000/courses", {
    method: "GET",
  });

  console.log(coursesGet);

  const coursesRes = await coursesGet.json();
  console.log(coursesRes);

  const productsGrid = document.getElementById("products-grid-id");

  if (coursesRes && Array.isArray(coursesRes)) {
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
        course.imageUrl ||
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
      productImage.alt = course.name;

      productImageContainer.appendChild(productImage);

      const productButtonsContainer = document.createElement("div");
      productButtonsContainer.className = "product-buttons";

      const buttonId = `${course.name.toLowerCase().replace(/\s+/g, "-")}-btn`;
      const aboutButton = document.createElement("button");
      aboutButton.id = buttonId;
      aboutButton.className = "btn-sobre";
      aboutButton.textContent = "SOBRE";

      aboutButton.onclick = function () {
        const descricaoElement = document.getElementById(
          "descricao-curso-texto"
        );
        if (descricaoElement) {
          descricaoElement.textContent = course.description;
        }

        const descricaoContainer = document.getElementById(
          "info-curso-container"
        );
        if (descricaoContainer) {
          descricaoContainer.style.display = "flex";
        }
      };

      const buyButton = document.createElement("button");
      buyButton.className = "btn-comprar";
      buyButton.textContent = "COMPRAR";

      productButtonsContainer.appendChild(aboutButton);
      productButtonsContainer.appendChild(buyButton);

      productCard.appendChild(productTitle);
      productCard.appendChild(productImageContainer);
      productCard.appendChild(productButtonsContainer);

      productsGrid.appendChild(productCard);
    });
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

  comprarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productTitle = productCard.querySelector(".product-title");

      if (productTitle) {
        const confirmacao = confirm(
          `Deseja adicionar "${productTitle.textContent}" ao carrinho?`
        );
        if (confirmacao) {
          alert("Produto adicionado ao carrinho com sucesso!");
        }
      } else {
        alert("Este produto estará disponível para compra em breve!");
      }
    });
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
});
