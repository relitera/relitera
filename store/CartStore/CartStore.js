class CartStore {
  constructor() {
    this.cart = []
    this.loadFromStorage();
  }

  setCart(cart) {
    this.cart = cart;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = null;
    localStorage.removeItem("cart");
  }

  loadFromStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) this.cart = JSON.parse(saved);
  }
}

const cartStore = new CartStore()

export default cartStore