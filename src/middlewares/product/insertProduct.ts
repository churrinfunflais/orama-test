import { Request, Response, NextFunction } from 'express';
import { DB } from '../../index.js';
import { Orama, insert } from '@orama/orama';
import { persistToFile } from '@orama/plugin-data-persistence';

const insertProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await insert(DB as unknown as Orama, req.body);
        await persistToFile(DB as unknown as Orama, 'json', './data.json');

        res.status(200).json(result);
    } catch (error: any) {
        return next(error);
    }
    return next();
};

export default insertProduct;
