import { Orama, search } from '@orama/orama';
import { Request, Response, NextFunction } from 'express';
import { DB } from '../../index.js';

const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchTerm = (req?.query?.search || '') as string;
        const limit = parseInt((req?.query?.limit || '50') as string, 10);
        const query = await search(DB as unknown as Orama, {
            term: searchTerm,
            properties: '*',
            limit,
            facets: {
                'brand.name': {
                    sort: 'DESC',
                },
            },
        });

        const searchResult = {
            results: query?.hits?.map((hit) => ({
                id: hit?.id,
                score: hit?.score,
                data: hit?.document,
            })),
            facets: Object.entries(query?.facets || {}).map(([key, value]) => ({
                name: key?.split('.')?.shift(),
                total: value?.count,
                values: Object.entries(value?.values).map(([key, value]) => ({
                    name: key,
                    total: value,
                })),
            })),
            elapsedTime: query?.elapsed?.formatted,
            total: query?.count,
        };

        res.status(200).json(searchResult);
    } catch (error: any) {
        return next(error);
    }
    return next();
};

export default searchProducts;
