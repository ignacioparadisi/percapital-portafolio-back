import { Entity } from "@Common/entities/Entity";
import { Pageable } from "./Page";

export class PortfolioPage<T extends Entity>{
    data: T[] = [];
    total: number = 0;
    totalStocksAmount?: number;
    totalBuyTotalCost?: number;
    totalDollarBuyTotalCost?: number;
    totalNetMarketValue?: number;
    totalDollarNetMarketValue?: number;
    totalRawValue?: number;
    totalDollarRawValue?: number;
    totalNetGp?: number;
    totalDollarNetGp?: number;
    performance?: number;

    constructor(data: T[], total?: number) {
        this.data = data;
        this.total = total ? total : 0;
    }

    static decode<T extends PortfolioPageable & Entity >(items: T[]): PortfolioPage<T> {
        let page = new PortfolioPage<T>(items, 0);
        if (items.length > 0) {
            if (items[0].total) {
                page.total = items[0].total;
                page.totalStocksAmount = items[0].totalStocksAmount;
                page.totalBuyTotalCost = items[0].totalBuyTotalCost;
                page.totalDollarBuyTotalCost = items[0].totalDollarBuyTotalCost;
                page.totalNetMarketValue = items[0].totalNetMarketValue;
                page.totalDollarNetMarketValue = items[0].totalDollarNetMarketValue;
                page.totalRawValue = items[0].totalRawValue;
                page.totalDollarRawValue = items[0].totalDollarRawValue;
                page.totalNetGp = items[0].totalNetGp;
                page.totalDollarNetGp = items[0].totalDollarNetGp;
                page.performance = items[0].performance;
            }
        }
        return page;
    }
}

export interface PortfolioPageable extends Pageable {
    totalStocksAmount?: number;
    totalBuyTotalCost?: number;
    totalDollarBuyTotalCost?: number;
    totalNetMarketValue?: number;
    totalDollarNetMarketValue?: number;
    totalRawValue?: number;
    totalDollarRawValue?: number;
    totalNetGp?: number;
    totalDollarNetGp?: number;
    performance?: number;
}