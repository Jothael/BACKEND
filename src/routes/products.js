const express = require('express')
const router = express.Router()
const { Server: ServerIO } = require('socket.io')

const ProductManager = require('../managers/ProductManager')
const productManager = new ProductManager()

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit)
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts()
  res.json(products)
})

router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  try {
    const product = productManager.getProductById(productId)
    res.json(product)
  } catch (error) {
    res.status(404).json({ error: 'El producto no existe' })
  }
})

router.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnail } = req.body
  try {
    const result = productManager.addProduct({ title, description, code, price, stock, category, thumbnail })
    res.json({ message: result })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  const updatedFields = req.body
  try {
    productManager.updateProduct(productId, updatedFields)
    res.json({ message: 'Producto actualizado' })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid)
  try {
    productManager.deleteProduct(productId)
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

module.exports = router
