import { Router } from "express";
import { ProductManager } from "../products_manager.js";
import { routProductJSON } from "../routesJSON/routes.js";
import multer from "multer"

const productsManager = new ProductManager( routProductJSON )

const router = Router();

const storage = multer.diskStorage({
    destination: function( req, file, cb ){
        cb( null, 'public/' )
    },
    filename: function( req, file, cb ){
        cb( null, file.originalname )
    }
})
const uploader = multer({ storage });

router.get('/', async( req, res ) => {
    const products = await productsManager.getProducts()
    res.render('home', { products })
})

router.get('/realtimeproducts', async( req, res ) => {
    const products = await productsManager.getProducts()
    res.render('realTimeProducts',{ products })
})


export default router;