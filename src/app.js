const express = require('express');
const app = express();
const port = 8080;


const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

app.use(express.json());

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'El producto no existe' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
