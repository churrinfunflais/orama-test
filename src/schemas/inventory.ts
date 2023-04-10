import { object, string, SchemaOf, number, array, boolean } from 'yup';

import { Inventory } from '../types/inventory';

export const InventoryObjectSchema: SchemaOf<Inventory> = object({
    sku: number().required(),
    quantity: number().required(),
    warehouseId: string().required(),
    reprocessCount: number().optional(),
    reprocess: boolean().optional(),
    error: string().optional(),
})
    .strict()
    .required();

export const InventorySchema: SchemaOf<Inventory[]> = array()
    .of(InventoryObjectSchema)
    .min(1)
    .strict()
    .required();
