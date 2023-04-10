// ------------------- [Modules] ----------------------- //
import { Request, Response, NextFunction } from 'express';

// ------------------- [Types] ------------------------- //
import { ResponseError } from '../../types/ResponseError';

// ------------------- [Error handler] ----------------- //
const errorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return next();
};

export default errorHandler;
