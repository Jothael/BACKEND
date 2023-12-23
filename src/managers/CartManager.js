const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.path = filePath || 'carts.json';
    this.carts = [];
    this.loadCartsFromFile();
  }

  async getCarts() {
    return this.carts;
  }

  async getCartById(cartId) {
    const result = this.carts.find((cart) => cart.id === cartId);
    if (!result) {
      throw new Error('El carrito no existe');
    }
    return result;
  }

  async createCart() {
    const newCart = { id: this.generateCartId(), products: [] };
    this.carts.push(newCart);
    await this.saveCartsToFile();
    return newCart;
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    const productIndex = cart.products.findIndex((p) => p.id === productId);
  
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ id: productId, quantity });
    }
  
    await this.saveCartsToFile();
    return cart;
  }
  

  async loadCartsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.saveCartsToFile();
      } else {
        console.error('Error al leer el archivo de carritos:', error.message);
      }
    }
  }

  async saveCartsToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
  }

  generateCartId() {
    return this.carts.length + 1;
  }
}

module.exports = CartManager;
