// ------------------- [Modules] ----------------------- //
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// ------------------- [Routers] ----------------------- //
import mainRouter from './routes/main.route';
import { expressLogger } from './middlewares/logger/logger.mdw';
import errorHandler from './middlewares/error/error.mdw';

// ------------------- [Config] ------------------------ //
import { PORT } from './config';

// ------------------- [App] --------------------------- //
export const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLogger);

app.use('/', mainRouter);

app.use(errorHandler);

app.listen(PORT);
