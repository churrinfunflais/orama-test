/* eslint-disable require-jsdoc */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from 'node:process';
import axiosRetry from 'axios-retry';

import { InventoryByWarehouse } from '../types/InventoryByWarehouse';
import { PriceBySku } from '../types/PriceBySku';
import { VtexUpdateInventoryRequest } from '../types/VtexUpdateInventoryRequest';
import { VtexUpdatePriceRequest } from '../types/VtexUpdatePriceRequest';
export default class VtexClient {
    storeId: string;
    http: AxiosInstance;
    constructor(storeId: string, config?: AxiosRequestConfig) {
        this.http = axios.create({
            ...config,
            baseURL: 'https://portal.vtexcommercestable.com.br/',
            params: {
                an: storeId,
            },
            headers: {
                'x-vtex-api-appKey': env.VTEX_API_APP_KEY?.trim() || '',
                'x-vtex-api-appToken': env.VTEX_API_APP_TOKEN?.trim() || '',
                'Content-Type': 'application/json',
            },
            responseType: 'json',
            timeout: 1000,
            transformRequest: [(request) => JSON.stringify(request)],
            transformResponse: [
                (response, headers) =>
                    (headers?.['content-type']?.includes('json') &&
                        JSON.parse(response)) ||
                    response,
            ],
        });

        this.storeId = storeId;

        axiosRetry(this.http, {
            retries: 3,
            onRetry: (retryCount, err, requestConfig) =>
                console.log(`retry ${retryCount} on ${requestConfig.url}`),
            retryCondition: () => true,
            retryDelay: axiosRetry.exponentialDelay,
        });
    }

    public prices = {
        update: async (
            skuId: number,
            data: VtexUpdatePriceRequest,
        ): Promise<boolean> => {
            const res = await this.http.put(
                `${this.storeId}/pricing/prices/${skuId}`,
                data,
                {
                    baseURL: 'https://api.vtex.com',
                },
            );
            if (res.status !== 200)
                throw new Error('Error updating price\n\r' + res?.data);
            return res.data;
        },
        getPrice: async (skuId: number): Promise<PriceBySku> => {
            const res = await this.http.get(
                `${this.storeId}/pricing/prices/${skuId}`,
                {
                    baseURL: 'https://api.vtex.com',
                },
            );
            if (res.status !== 200)
                throw new Error('Error getting price\n\r' + res?.data);
            return res.data;
        },
    };

    public inventory = {
        update: async (
            skuId: number,
            warehouseId: string,
            data: VtexUpdateInventoryRequest,
        ): Promise<boolean> => {
            const res = await this.http.put(
                `/api/logistics/pvt/inventory/skus/${skuId}/warehouses/${warehouseId}`,
                data,
            );
            if (res.status !== 200)
                throw new Error(
                    'Error updating inventory: ' +
                        (res?.data?.error?.message || res?.data),
                );
            return res.data;
        },
        getInventory: async (
            skuId: number,
            warehouseId: string,
        ): Promise<InventoryByWarehouse> => {
            const res = await this.http.get(
                `/api/logistics/pvt/inventory/items/${skuId}/warehouses/${warehouseId}`,
            );
            if (res.status !== 200)
                throw new Error(
                    'Error updating inventory: ' +
                        (res?.data?.error?.message || res?.data),
                );

            const inventory = res.data.find(
                (i: InventoryByWarehouse) => i?.warehouseId === warehouseId,
            );

            return inventory;
        },
    };

    public catalog = {
        allSkuIds: async (page = 1, pageSize = 200000): Promise<number[]> => {
            const res = await this.http.get(
                'api/catalog_system/pvt/sku/stockkeepingunitids',
                {
                    params: {
                        page,
                        pageSize,
                    },
                    timeout: 6000,
                },
            );
            if (res.status !== 200)
                throw new Error('Error getting all sku ids\n\r' + res?.data);
            return res.data;
        },
        getSku: async (skuId: number): Promise<any> => {
            const res = await this.http.get(
                `/api/catalog/pvt/stockkeepingunit/${skuId}`,
                {
                    timeout: 6000,
                },
            );
            if (res.status !== 200)
                throw new Error('Error getting sku:' + res?.data);
            return res.data;
        },
    };
}
