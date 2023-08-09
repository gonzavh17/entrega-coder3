import { promises as fs } from "fs";

 class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementarID();
  }

  static incrementarID() {
    if (this.idIncrement) {
      
      this.idIncrement++; 
    } else {
      this.idIncrement = 1; 
    }
    return this.idIncrement;
  }
}

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }



  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    console.log(products);
  }

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const foundProduct = products.find((prod) => prod.id === product.id);

    if (foundProduct) return console.log("producto ya existente");

    console.log("Producto agregado exitosamente");
    products.push(product);

    await fs.writeFile("products.json", JSON.stringify(products));
  }

  async getProductsbyId(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const searchedProduct = products.find((prod) => prod.id === id);

    if (searchedProduct) {
      console.log(searchedProduct);
    } else {
      console.log("El producto buscado no existe");
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const index = products.findIndex((prod) => prod.id === id);

    if (index != -1) {
      products[index].title = title;
      products[index].description = description;
      products[index].price = price;
      products[index].thumbnail = thumbnail;
      products[index].code = code;
      products[index].stock = stock;

      console.log("Producto modificado exitosamente");

      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const searchedProduct = products.find((prod) => prod.id === id);

    if (!searchedProduct) {
      return console.log("Producto no encontrado");
    }

    console.log("Producto eliminado exitosamente");

    const prods = products.filter((prod) => prod.id != id);

    await fs.writeFile(this.path, JSON.stringify(prods));
  }
}

const productManager = new ProductManager("products.json");

const product1 = new Product(
  "prod1",
  "este es el producto 1",
  350,
  "img.jpg",
  "222",
  20
);

/* ADD PRODUCT */
/* productManager.addProduct(product1); */
/* productManager.getProducts() */

/* UPDATE PRODUCT */
/* productManager.updateProduct(1,{title: "arroz", description:"arroz integral", price: 1000, thumbnail: "imagen1.jpg", code: "555", stock: 450}) */


/* GET PRODUCTS BY ID */
// productManager.getProductsbyId(1)
// productManager.getProductsbyId(2) /* devuelve el producto buscado no existe */

/* GET PRODUCTS */
// productManager.getProducts();


/* DELETE PRODUCTS */
// productManager.deleteProduct(1) 
