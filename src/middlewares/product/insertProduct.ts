import { Request, Response, NextFunction } from 'express';
import { DB } from '../../index.js';
import { insert } from '@orama/orama';
import persist from '../../handlers/persist.handler.js';

const insertProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await insert(DB, req.body);
        await persist(DB);

        res.status(200).json(result);
    } catch (error: any) {
        return next(error);
    }
    return next();
};

export default insertProduct;
