// ------------------- [Modules] ----------------------- //
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// ------------------- [Routers] ----------------------- //
import productsRouter from './routes/products.route.js';
import { expressLogger } from './middlewares/logger/logger.mdw.js';
import errorHandler from './middlewares/error/error.mdw.js';

// ------------------- [Config] ------------------------ //
import { PORT } from './config.js';
import { create } from '@orama/orama';
import ProductSchema from './schemas/Product.schema.js';
import restore from './handlers/restore.handler.js';

// ------------------- [App] --------------------------- //
export const app = express();

// ------------------- [Orama] ------------------------- //
export const DB = await create({
    schema: ProductSchema,
});
await restore(DB);

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLogger);

app.use(productsRouter);

app.use(errorHandler);

app.listen(PORT);
