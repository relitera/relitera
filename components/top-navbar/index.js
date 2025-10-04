class TopNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <script src="https://kit.fontawesome.com/c2b6f6de7d.js" crossorigin="anonymous"></script>
      
      <style>
        .sidebar {
          position: fixed;
          z-index: 1001;
          height: 100%;
          top: 0;
          left: 0;
          width: 250px;
          background-color: var(--bg-hero);
          padding: 2rem;
          color: var(--texto-hero);
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .sidebar-close {
          background: none;
          border: none;
          color: var(--texto-hero);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          width: 40px;
          height: 40px;
        }

        .sidebar-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--accent-gold);
          transform: scale(1.1);
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar li {
          margin-bottom: 0.5rem;
        }

        .sidebar a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          color: var(--texto-hero);
          text-decoration: none;
          border-radius: 10px;
          transition: var(--transition);
          font-weight: 500;
        }

        .sidebar a:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .sidebar-backdrop.active {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 100%;
          }
        }

        .header-esq {
          display: flex;
          align-items: center;
          gap: 1rem;
          .cart-icone {
            background: linear-gradient(135deg, #af79c4 0%, #934cb2 100%);
            padding: 12px;
            border-radius: 50%;
            transition: var(--transition);
            position: relative;

            &::before {
              content: "";
              position: absolute;
              top: -2px;
              right: -2px;
              width: 8px;
              height: 8px;
              background: var(--accent-orange);
              border-radius: 50%;
              opacity: 0;
              transform: scale(0);
              transition: var(--transition);
            }

            &:hover {
              transform: scale(1.1);
              box-shadow: 0 4px 15px rgba(175, 121, 196, 0.4);

              &::before {
                opacity: 1;
                transform: scale(1);
              }
            }
          }
        }

        .top-navbar-container {
          background: rgba(147, 76, 178, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.2rem 3rem;
          color: #ffffff;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 1000;

          a {
            color: inherit;
            text-decoration: none;
            transition: var(--transition);

            &:hover {
              transform: scale(1.05);
            }
          }

          box-shadow: 0 8px 32px rgba(147, 76, 178, 0.2);

          i {
            transition: var(--transition);

            &:hover {
              cursor: pointer;
              transform: scale(1.1);
              color: var(--accent-gold);
            }
          }
        }

        @media (max-width: 768px) {
          .top-navbar-container {
            padding: 1rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .top-navbar-container {
            padding: 1rem 1.5rem;
          }
        }
      </style>

      <div class="top-navbar-container">
        <div class="header-esq">
          <i id="aaaa" class="fa-solid fa-bars fa-lg"></i>
          <a href="./index.html"><h1>Relitera</h1></a>
        </div>
        <div class="cart-icone">
          <i class="fa-solid fa-cart-shopping fa-lg"></i>
        </div>
      </div>

      <div class="sidebar">
        <div class="sidebar-header">
          <h3>Menu</h3>
          <button class="sidebar-close" aria-label="Fechar menu">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <ul>
          <li>
            <a href="index.html">
              <i class="fa-solid fa-home"></i>Início
            </a>
          </li>
          <!-- TODO: Adicionar links corretos para as páginas -->
          <li>
            <a><i class="fa-solid fa-users"></i>Quem Somos</a>
          </li>
          <li>
            <a><i class="fa-solid fa-store"></i>Loja</a>
          </li>
          <li>
            <a><i class="fa-solid fa-user"></i>Minha Conta</a>
          </li>
          <li>
            <a><i class="fa-solid fa-graduation-cap"></i>Plataforma</a>
          </li>
        </ul>
      </div>

      <div class="sidebar-backdrop"></div>
    `;

    this.attachEventListeners();
  }

  toggleSidebar() {
    console.log("here");
    const sidebar = this.querySelector(".sidebar");
    const backdrop = this.querySelector(".sidebar-backdrop");
    sidebar.classList.toggle("open");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("disable-scroll");
  }

  closeSidebar() {
    const sidebar = this.querySelector(".sidebar");
    const backdrop = this.querySelector(".sidebar-backdrop");
    sidebar.classList.remove("open");
    backdrop.classList.remove("active");
    document.body.classList.remove("disable-scroll");
  }

  attachEventListeners() {
    const sidebarToggle = this.querySelector("#aaaa");
    const sidebarClose = this.querySelector(".sidebar-close");
    const backdrop = this.querySelector(".sidebar-backdrop");

    sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    sidebarClose.addEventListener("click", () => this.closeSidebar());
    backdrop.addEventListener("click", () => this.closeSidebar());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const sidebar = this.querySelector(".sidebar");
        if (sidebar.classList.contains("open")) {
          this.closeSidebar();
        }
      }
    });
  }
}

customElements.define("top-navbar", TopNavbar);