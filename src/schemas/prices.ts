import { object, string, SchemaOf, number, array, boolean } from 'yup';
import { Price } from '../types/price';

export const PriceObjectSchema: SchemaOf<Price> = object({
    sku: number().required(),
    costPrice: number().optional(),
    listPrice: number().optional(),
    basePrice: number().required(),
    reprocess: boolean().optional(),
    reprocessCount: number().optional(),
    error: string().optional(),
})
    .strict()
    .required();

export const PricesSchema: SchemaOf<Price[]> = array()
    .of(PriceObjectSchema)
    .min(1)
    .strict()
    .required();
