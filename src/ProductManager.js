const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath || 'products.json';
    this.products = [];
    this.loadProductsFromFile();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    if (!product.title || 
        !product.description || 
        !product.price || 
        !product.thumbnail || 
        !product.code || 
        !product.stock) 
        {
      return 'No se completaron los datos del producto';
    }

    const result = this.products.find((prod) => prod.code === product.code);

    if (result) {
      return 'Productos existentes con el mismo código';
    }

    const newProduct = { ...product, id: this.generateProductId() };
    this.products.push(newProduct);
    this.saveProductsToFile(); 

    return 'El Producto ha sido agregado';
  }

  getProductById(productId) {
    const result = this.products.find((prod) => prod.id === productId);
    if (!result) {
      throw new Error('El producto no existe');
    }
    return result;
  }

  updateProduct(productId, updatedFields) {
    const productToUpdate = this.getProductById(productId);
    const updatedProduct = { ...productToUpdate, ...updatedFields };
    const index = this.products.findIndex((prod) => prod.id === productId);
    this.products[index] = updatedProduct;
    this.saveProductsToFile();

    return 'El Producto ha sido actualizado';
  }

  deleteProduct(productId) {
    const index = this.products.findIndex((prod) => prod.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToFile();

      return 'El Producto ha sido eliminado';
    } else {
      throw new Error('El producto no existe');
    }
  }

  generateProductId() {
    return this.products.length + 1;
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.saveProductsToFile();
      } else {
        console.error('Error al leer el archivo:', error.message);
      }
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }
}

const productManager = new ProductManager();


module.exports = ProductManager;

console.log(productManager.getProducts());

// console.log(
//   productManager.addProduct({
//     title: 'producto prueba',
//     description: 'Este es un producto prueba',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     code: 'abc123',
//     stock: 25,
//   })
// );

// console.log(productManager.getProducts());

// try {
//   console.log(productManager.getProductById(1));
// } catch (error) {
//   console.error(error.message);
// }

// console.log(
//   productManager.updateProduct(1, {
//     price: 1200.99,
//     stock: 15,
//   })
// );

// console.log(productManager.getProducts());

// try {
//   console.log(productManager.deleteProduct(1));
// } catch (error) {
//   console.error(error.message);
// }