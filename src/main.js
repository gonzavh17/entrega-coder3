import express from 'express'
import ProductManager from './productManager.js';
const productManager1 = new ProductManager("Data/products.json")

const app = express()
const PORT = 4000
app.get(express.json())
app.get(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
res.send("Hello World")
})

app.get('/products', async (req, res) => {
    const {limit} = req.query
    const products = await productManager1.getProducts()
    if(limit) {
        const limitProducts = products.slice(0, limit)
        res.json({status: "Succes", limitProducts})
    } else {
        res.json({status : "Success", products})
    }

})

app.get('/products/:pid', async (req, res) => {

    if (req.params.pid) {
        const product = productManager1.getProductsById(parseInt(req.params.pid));
        console.log(product)
        return res.send(product);
    }
    else {
        return console.error("Producto no existente")
    }

});

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})