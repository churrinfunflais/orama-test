export interface InventoryByWarehouse {
    skuId: string;
    warehouseId: string;
    dockId: string;
    totalQuantity: number;
    reservedQuantity: number;
    availableQuantity: number;
    isUnlimited: boolean;
    salesChannel: string[];
    deliveryChannels: string[];
    timeToRefill: null;
    dateOfSupplyUtc: null;
    supplyLotId: null;
    keepSellingAfterExpiration: boolean;
    transfer: null;
}
