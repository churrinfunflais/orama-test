import { Orama, search } from '@orama/orama';
import { Request, Response, NextFunction } from 'express';
import { DB } from '../../index.js';

const getProductBySku = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sku = req.params.sku;
        const query = await search(DB as unknown as Orama, {
            term: sku,
            properties: ['sku'],
            exact: true,
        });

        const searchResult = query?.hits?.shift()?.document;

        res.status(200).json(searchResult);
    } catch (error: any) {
        return next(error);
    }
    return next();
};

export default getProductBySku;
