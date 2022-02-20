import {Decodable} from "@Common/utils/Decodable";
import {Entity} from "@Common/entities/Entity";

export class StockHistoric extends Entity implements Decodable {
    id?: number;
    symbol?: string;
    date?: Date;
    closePrice?: number;
    openPrice?: number;
    highPrice?: number;
    lowPrice?: number;
    volume?: string;
    change?: string;

    constructor(entity?: StockHistoric);
    constructor(symbol: string, closePrice: number);
    constructor(...args: any[]) {
        super();
        if (args.length === 1 && args[0] instanceof StockHistoric) {
            let entity = args[0] as StockHistoric;
            this.id = entity.id;
            this.symbol = entity.symbol;
            this.date = entity.date;
            this.closePrice = entity.closePrice;
            this.openPrice = entity.openPrice;
            this.highPrice = entity.highPrice;
            this.lowPrice = entity.lowPrice;
            this.volume = entity.volume;
            this.change = entity.change;
        } else if (args.length === 2) {
            this.symbol = args[0] as string;
            this.closePrice = args[1] as number;
            this.date = new Date();
        }
    }

    codingKeys = {
        id: 'id',
        symbol: 'symbol',
        date: 'stock_date',
        closePrice: 'close_price',
        openPrice: 'open_price',
        lowPrice: 'low_price',
        highPrice: 'high_price',
        volume: 'volume',
        change: 'change'
    }
}