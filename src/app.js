import express from 'express'
import { ProductManager } from './product_manager.js'

const app = express()
const productManager = new ProductManager('./data/products.json')


app.get( '/products', async ( req, res ) => {
    try{
        const result = await productManager.getProducts()
        const limit = req.query.limit; 
        
        res.status( 200 ).json({ playload: result.slice( 0, limit ) })
    }catch{
        res.send( 'No se encuentran los productos en este momento!' )
    }
})

app.get('/products/:id', async ( req, res ) => {
    const id = parseInt(req.params.id)
    try{
        const result = await productManager.getProductsById( id );
        return res.status( 200 ).json({ playload: result})

    }catch{
        return res.send({ error: `No se encuntra el id espacificado en el URL param: ${ id }` })
    }
})


app.listen(8080, () => console.log( 'Server Up' ));