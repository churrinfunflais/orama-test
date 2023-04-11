// ------------------- [Modules] ----------------------- //
import { Request, Response, NextFunction } from 'express';

// ------------------- [Types] ------------------------- //
import { ResponseError } from '../../types/ResponseError.js';
import { logger } from '../logger/logger.mdw.js';

// ------------------- [Error handler] ----------------- //
const errorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    logger.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return next();
};

export default errorHandler;
