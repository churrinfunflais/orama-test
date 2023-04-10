export interface Price {
    sku: number;
    costPrice?: number;
    listPrice?: number;
    basePrice: number;
    reprocess?: boolean;
    reprocessCount?: number;
    error?: string;
}
