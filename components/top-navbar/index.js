class TopNavbar extends HTMLElement {
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

            @media (max-width: 480px) {
                .top-navbar-container {
                padding: 1rem 1.5rem;
                }
            }
            }
        </style>
        <div class="top-navbar-container">
            <div class="header-esq">
                <i class="fa-solid fa-bars fa-lg"></i>
                <a href="./index.html"><h1>Relitera</h1></a>
            </div>
            <div class="cart-icone">
                <i class="fa-solid fa-cart-shopping fa-lg"></i>
            </div>
        </div>
    `;
  }
}

customElements.define("top-navbar", TopNavbar);
