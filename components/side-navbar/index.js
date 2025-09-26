class SideNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <script
            src="https://kit.fontawesome.com/c2b6f6de7d.js"
            crossorigin="anonymous"
        ></script>
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
      </style>
      <div class="sidebar">
            <div class="sidebar-header">
                <h3>Menu</h3>
                <button class="sidebar-close" aria-label="Fechar menu">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <ul>
                <li>
                    <a href="index.html"
                        ><i class="fa-solid fa-home"></i>Início</a
                    >
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
    `;
  }
}

customElements.define("side-navbar", SideNavbar);
