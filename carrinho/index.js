import cartStore from "../store/CartStore/CartStore.js"

function createCartItem(id, name, quantity) {
    if (!id || !name || !quantity) return

    const itemCarrinho = document.createElement('div');
    itemCarrinho.id = 'item-carrinho';

    const infoItemCarrinho = document.createElement('div');
    infoItemCarrinho.id = 'info-item-carrinho';

    const nomeH1 = document.createElement('h1');
    nomeH1.id = 'info-item-carrinho-nome';
    nomeH1.textContent = `${name} -`;

    const qtdH1 = document.createElement('h1');
    qtdH1.id = 'info-item-carrinho-qtd';
    qtdH1.textContent = `${quantity}x`; 

    infoItemCarrinho.appendChild(nomeH1);
    infoItemCarrinho.appendChild(qtdH1);

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

    if (!productsInCart.length) {
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

document.addEventListener("DOMContentLoaded", async function() {
    updateCart()

    const limparCarrinhoButton = document.getElementById("Limpar")

    limparCarrinhoButton.addEventListener("click", function() {
        cartStore.clearCart()
    })
})