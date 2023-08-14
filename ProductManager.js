import fs from 'fs'

export class ProductManager {
    #_path
    #_products = []
    constructor( path ){
        this.#_path = path;
        this.#init()
    }

    async #init(){
        if ( !fs.existsSync( this.#_path ) ) 
            await fs.promises.writeFile( this.#_path, JSON.stringify([], null, 2) )
    }

    #createId(){
        let id = this.#_products.length + 1 
        const lastProd = this.#_products[this.#_products.length - 1]?.id
        return this.#_products.some( p => p.id === id ) ? lastProd + 1 : id;
    }

    async #addProdJSON(){
        await fs.promises.writeFile(this.#_path, JSON.stringify(this.#_products, null, 2) )
    }

    async addProduct( product ){
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = product
        if ( !title || !description || !price || !thumbnail || !code || !stock ) throw new Error('Must submit all required fields')
        if ( this.#_products.some( p => p.code === code ) ) throw new Error(`Code: ${ code } must be unique, now is repetead!`)
        product.id = this.#createId()
        this.#_products.push( product )
        await this.#addProdJSON()
        return product
    }

    getProducts = () => this.#_products;

    getProductsById = ( id ) => {
        const prod = this.#_products.find( p => p.id === id );
        if( !prod ) throw new Error( `Don´t found the id: ${ id }`);
        return prod
    }
    
    updateProduct( id, product){
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = product
        if ( !id && !title && !description && !price && !thumbnail && !code && !stock ) throw new Error( 'At least one valid property within an object is required to update: like = {title: "Hello World", price: 27}')

        const productUpdate = this.getProductsById( id );
        console.log( 'a',productUpdate )
        let newProduct = {}
        for( const prop in productUpdate ){
            newProduct[prop] = product[prop] || productUpdate[prop]
        }

        this.#_products = this.#_products.map( p => {
            if(p.id === id) return p = newProduct;
            return p
        })
        
        this.#addProdJSON()
        return this.#_products
    }

    async deleteProduct( id ) {
        
        if (!this.#_products.find( p => p.id === id )) throw new Error( `Don´t found the id: ${ id }` )
        
        this.#_products = this.#_products.filter( p => {
            return p.id !== id
        })
        
    }
}