import { Decodable } from "@Common/utils/Decodable";
import { Entity } from "./Entity";

export class Report extends Entity implements Decodable {
    id: number;
    symbol: string;
    name?: string;
    createdAt: Date;
    changePercentage: number;
    latestPrice: number;
    buyChangePercentage?: number;
    sellChangePercentage?: number;

    codingKeys = {
        id: 'st_id',
        symbol: 'st_symbol',
        name: 'st_name',
        createdAt: 'st_created_at',
        changePercentage: 'st_change',
        latestPrice: 'st_latest_price',
        buyChangePercentage: 'st_buy_speculate',
        sellChangePercentage: 'st_sell_speculate'
    }

    constructor(entity?: Report) {
        super(entity)
        this.id = entity?.id ?? 0;
        this.symbol = entity?.symbol ?? '';
        this.name = entity?.name;
        this.createdAt = entity?.createdAt ?? new Date();
        this.changePercentage = entity?.changePercentage ?? 0;
        this.latestPrice = entity?.latestPrice ?? 0;
        this.buyChangePercentage = entity?.buyChangePercentage;
        this.sellChangePercentage = entity?.sellChangePercentage;
    }
}