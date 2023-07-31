class ProductManager {
    #products;
    static idCounter = 0;

    constructor(title, description, price, thumbnail, code, stock) {
        //Inicializo la lista de productos y el contador de IDs
        this.#products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    // Agrego un producto a la lista de productos
    addProduct(title, description, price, thumbnail, code, stock) {
        if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined)
            return console.log("Todos los campos son obligatorios");

        if (this.#products.find(p => p.code === code))
            return console.log("Ya existe un producto con este codigo");

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ++ProductManager.idCounter
        };

        this.#products.push(newProduct);

        return console.log("Producto Añadido");
    }

    // Devuelve la lista completa de productos
    getProducts() {
        return console.log(this.#products);
    }

    // Devuelve el producto que tiene el ID especificado
    getProductById(pid) {
        if (this.#products.find(p => p.id === pid)) {
            const productFound = this.#products.find(p => p.id === pid);
            return console.log(productFound);
        }
        return console.log("No existe un producto con ese id");
    }
}

const productManager = new ProductManager();

productManager.addProduct("Mancuerna", "Articulo de gimnasia", "2500", "/images/gimansio.png", "1", 5);
productManager.addProduct("Colchoneta de gimnasia", "Articulo de gimnasia", "1500", "/images/gimansio.png", "2", 5);
productManager.addProduct("Pesa rusa", "Articulo de gimnasia", "3500", "/images/gimansio.png", "4", 5);
productManager.addProduct("Barra de gimnasio", "Articulo de gimnasia", "3000", "/images/gimansio.png", "5", 5);
productManager.addProduct("Disco de pesa", "Articulo de gimnasia", "7620", "/images/gimansio.png", "6", 5);
productManager.addProduct("Banco inclinable", "Articulo de gimnasia", "4000", "/images/gimansio.png", "7", 5);
productManager.addProduct("Guantes deportivos", "Articulo de gimnasia", "700", "/images/gimansio.png", "8", 5);
productManager.addProduct("Conjunto de ropa deportiva", "Articulo de gimnasia", "10000", "/images/gimansio.png", "9", 5);

// Muestra la lista completa de productos
//console.log(productManager.getProducts())

// Busca y muestra el producto con ID 1
//console.log( productManager.getProductById(1));