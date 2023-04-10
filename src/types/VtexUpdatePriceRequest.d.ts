export interface VtexUpdatePriceRequest {
    listPrice?: number;
    costPrice?: number;
    markup?: number;
    fixedPrices?: FixedPrice[];
    basePrice: number;
}

export interface FixedPrice {
    tradePolicyId: string;
    value: number;
    listPrice: null;
    minQuantity: number;
    dateRange?: DateRange;
}

export interface DateRange {
    from: string;
    to: string;
}
