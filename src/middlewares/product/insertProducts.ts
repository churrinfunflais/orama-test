import { Request, Response, NextFunction } from 'express';
import { DB } from '../../index.js';
import { insertMultiple } from '@orama/orama';
import persist from '../../handlers/persist.handler.js';

const insertProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req?.body || [];
        const result = await insertMultiple(DB, data);
        await persist(DB);

        res.status(200).json(result);
    } catch (error: any) {
        return next(error);
    }
    return next();
};

export default insertProducts;
