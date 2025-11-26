import cartStore from "../store/CartStore/CartStore.js"
import userStore from "../../store/UserStore/UserStore.js";

function createCartItem(id, name, quantity) {
    if (!id || !name || !quantity) return

    const itemCarrinho = document.createElement('div');
    itemCarrinho.id = 'item-carrinho';

    const infoItemCarrinho = document.createElement('div');
    infoItemCarrinho.id = 'info-item-carrinho';

    const nomeH1 = document.createElement('h1');
    nomeH1.id = 'info-item-carrinho-nome';
    nomeH1.textContent = `${name}`;

    infoItemCarrinho.appendChild(nomeH1);

    const removerBtn = document.createElement('button');
    removerBtn.id = 'remover-item-btn';
    removerBtn.textContent = 'Remover';
    removerBtn.onclick = function() {
        cartStore.removeProduct(id)
        updateCart()
    }

    itemCarrinho.appendChild(infoItemCarrinho);
    itemCarrinho.appendChild(removerBtn);

    return itemCarrinho;
}

const updateCart = () => {
    const productsToRemove = document.querySelectorAll('[id="item-carrinho"]');

    productsToRemove.forEach(element => {
        element.remove();
    });

    const productsInCart = cartStore.getCart()

    const carrinhoVazioText = document.getElementById("carrinho-vazio-texto")

    if (!productsInCart || !productsInCart.length) {
        const precoTotalTexto = document.getElementById("preco-total")

        precoTotalTexto.textContent = `R$0`

        carrinhoVazioText.style.display = "flex"
        return
    }

    let totalPrice = 0

    productsInCart.map((product) => {
        const cartItensContainer = document.getElementById("cart-itens-container")
        
        totalPrice += parseFloat(product.price * product.quantity)

        const cartItemEl = createCartItem(product.id, product.name, product.quantity)
        console.log(cartItemEl)
        cartItensContainer.appendChild(cartItemEl)
    })

    const precoTotalTexto = document.getElementById("preco-total")

    precoTotalTexto.textContent = `R$${totalPrice}`
}

const finalizarCompra = async () => {
    try {
        const mensagemCompra = document.getElementById("mensagem")

        const formData = {
            user_id: userStore.user.id,
            course_ids: []
        }

        const courseIds = cartStore.cart.map((produto) => {
            return produto.id
        })

        if (!courseIds.length) {
            console.log("Sem produtos no carrinho para comprar")
            mensagemCompra.textContent = "Seu carrinho está vazio!"
            mensagemCompra.style.color = "#f94120"

            return false
        }

        formData.course_ids = courseIds

        const novaCompra = await fetch("http://localhost:8000/course/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        });

        const novaCompraRes = await novaCompra.json();

        console.log(novaCompraRes)
        if (novaCompraRes.success) {
            mensagemCompra.textContent = novaCompraRes.message
            mensagemCompra.style.color = "#27ae60";
            cartStore.clearCart()
            updateCart()
            return
        }
    } catch(err) {
        const mensagemCompra = document.getElementById("mensagem")

        mensagemCompra.textContent = "Algum erro ocorreu. Tente novamente mais tarde."
        mensagemCompra.style.color = "#f94120"
        console.log(err)
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    updateCart()

    const limparCarrinhoButton = document.getElementById("Limpar")

    limparCarrinhoButton.addEventListener("click", function() {
        cartStore.clearCart()
        updateCart()
    })

    const finalizarCompraButton = document.getElementById("Finalizar")

    finalizarCompraButton.addEventListener("click", async () => {
        await finalizarCompra()
    })
})