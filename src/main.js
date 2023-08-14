import express from 'express';
import { ProductManager } from './ProductManager.js';

const manager = new ProductManager('Data/products.json')
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hola Mundo');
});


app.get('/products', async (req, res) => {
    const {limit} = req.query
    const products = await manager.getProducts()
    if (limit) {
        res.send(products.slice(0, limit));
    } else {
        res.send(products);
    }
})

app.get('/products/:pid', async (req, res) => {
    const product = await manager.getProductsById(parseInt(req.params.pid))
    if(product) {
        res.send(product)
    } else {
        res.send('Producto no encontrado')
    }
})

app.get('*', (req, res) => {
    res.send("Error 404 not found")
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})