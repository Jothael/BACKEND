const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.get('/:cartId', async (req, res) => {
  const cartId = parseInt(req.params.cartId);
  try {
    const cart = await cartManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'El carrito no existe' });
  }
});

router.post('/:cartId/product/:productId', async (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  try {
    const cart = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'El carrito no existe' });
  }
});

module.exports = router;
