class CartStore {
  constructor() {
    this.cart = []
    this.loadFromStorage();
  }

  setCart(cart) {
    this.cart = cart;
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = null;
    localStorage.removeItem("cart");
  }

  addProduct(newProduct) {
    let jaAdicionado = false;

    const newCart = this.cart.map((product) => {
      if (product.id === newProduct.id) {
        jaAdicionado =  true
        return {
          ...product,
          quantity: product.quantity ? product.quantity + 1 : 0
        }
      }

      return product
    })

    if (!jaAdicionado) {
      this.cart.push({
        ...newProduct,
        quantity: 1
      })
    } else {
      this.cart = newCart
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  removeProduct(productId) {
    const newCart = this.cart.filter((product) => product.id !== productId)

    this.cart = newCart

    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  loadFromStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) this.cart = JSON.parse(saved);
  }
}

const cartStore = new CartStore()

export default cartStore