const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const { Server: ServerIO } = require('socket.io')
const ProductManager = require('./managers/ProductManager')

const httpServer = app.listen(8080, () => {
  console.log(`Servidor corriendo en http://localhost:8080`)
})

const io = new ServerIO(httpServer)

const productManager = new ProductManager('products.json',io)
const productsRouter = require('./routes/products')
const cartsRouter = require('./routes/carts')

app.use(express.static(__dirname + '../public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const limit = parseInt(req.query.limit)
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts()
  res.render('home', { products })
})

app.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts()
  res.render('realTimeProducts', { products })
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



io.on('connection', socket => {
  console.log('cliente conectado')

  socket.on('newProduct', (productData) => {
    console.log(productData)
    const Product = {
      ...productData,
        code: productData.title, price: Number(productData.price), stock: 25 , category: 'generico ', thumbnail:'sin imagen'
    }
  
    productManager.addProduct(Product)
    io.emit('updateProducts', productManager.getProducts())
  })

  socket.on('deleteProduct', (productData) => {
    console.log(productData.id)
    productManager.deleteProduct(productData.id)
    io.emit('updateProducts', productManager.getProducts())
  })
})
