// ------------------- [Modules] ----------------------- //
import express from 'express';

// ------------------- [Middlewares] ----------------------- //
import searchProducts from '../middlewares/product/searchProducts.js';
import insertProducts from '../middlewares/product/insertProducts.js';
import getProductBySku from '../middlewares/product/getProductBySku.js';

// ------------------- [Product router] ------------------- //
const productsRouter = express.Router();

productsRouter.get('/products', searchProducts);
productsRouter.post('/products', insertProducts);
productsRouter.get('/products/:sku', getProductBySku);

export default productsRouter;
