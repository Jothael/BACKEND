class ProductManager {
    constructor(){
        this.products = []
    }
    getProducts(){
        return this.products
    }
    addProduct(product){
        if( !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock)
        {
            return 'No se completaron los datos del producto' 
        } 
        
        const result = this.products.find( prod => prod.code === product.code )

        if (result) {
            return 'Productos existentes con el mismo codigo'
        }
        
        if (this.products.length === 0) {
            product.id = 1
            this.products.push( product )
        }else{
            product.id = this.products.length + 1
            this.products.push( product )
        }
        return 'El Producto ha sido agregado'

    }

    getProductById(productId){
        const result = this.products.find(prod => prod.id ===productId)
        if (!result) {
            return 'El producto no existe'
        }
        return result
    }
    
}

const product1 = {
    title: 'Remera',
    description: 'Remera Deportiva',
    price: 5999.99,
    thumbnail: 'Link Imagen',
    code: 'abc123',
    stock: 17
  };
  
  const product2 = {
    title: 'Zapatillas',
    description: 'Zapatillas de Gimnasia',
    price: 39999.99,
    thumbnail: 'Link Imagen',
    code: 'abc1234',
    stock: 20
  };
  
  const productManager = new ProductManager();
  
  console.log(productManager.addProduct(product1));
  console.log(productManager.addProduct(product2));
  console.log(productManager.addProduct(product1));
  
  console.log(productManager.getProducts());

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));
  
  