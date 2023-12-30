const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const { Server: ServerIO, Socket } = require('socket.io')


const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.get('/', (req,res)=>{
  res.render('home',{} )
})
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(8080, () => {
  console.log(`Servidor corriendo en http://localhost:8080`);
});

const io = new ServerIO(httpServer)
io.on('connection', socket =>{
  console.log('cliente conectado')
})