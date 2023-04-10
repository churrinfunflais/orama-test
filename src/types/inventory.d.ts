export interface Inventory {
    sku: number;
    quantity: number;
    warehouseId: string;
    reprocess?: boolean;
    reprocessCount?: number;
    error?: string;
}
