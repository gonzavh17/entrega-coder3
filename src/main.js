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
    const { pid } = req.params;
    try {
        const products = await productManager1.getProducts();

        if (!Array.isArray(products)) {
            res.status(500).send({ status: "Error", message: "Invalid products data" });
            return;
        }

        const foundId = products.find(prod => prod.id === parseInt(pid));
        if (foundId) {
            console.log(foundId);
            res.send({ status: "Success", foundId });
        } else {
            res.status(404).send({ status: "Error", message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: "Internal server error" });
    }
});


app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})