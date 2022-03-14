import { Decodable } from "@Common/utils/Decodable";
import { PortfolioPageable } from "@Common/utils/PortfolioPage";
import { Entity } from "./Entity";

export class Portfolio extends Entity implements Decodable, PortfolioPageable {
    total?: number;
    performace?: number;
    totalStocksAmount?: number;
    totalBuyTotalCost?: number;
    totalDollarBuyTotalCost?: number;
    totalNetMarketValue?: number;
    totalDollarNetMarketValue?: number;
    totalRawValue?: number;
    totalDollarRawValue?: number;
    totalNetGp?: number;
    totalDollarNetGp?: number;

    userId?: number;
    id?: number;
    titleSymbol?: string;
    titleDesc?: string;
    stockPrice?: number;
    stockInFolio?: number;
    avgBuyPrice?: number;
    buyTotalCost?: number;
    dollarBuyTotalCost?: number;
    marketNetValue?: number;
    dollarMarketNetValue?: number;
    rawValue?: number;
    dollarRawValue?: number;
    rawSells?: number;
    dollarRawSells?: number;
    netGp?: number;
    dollarNetGp?: number;
    variation?: number;
    dollarVariation?: number;
    percentageInFolio?: number;

    constructor(entity?: Portfolio) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.total = entity ? entity.total : undefined;
   }


    codingKeys = {
        total: 'port_count',
        performance: 'port_performance_value',
        totalStocksAmount: 'port_total_stocks_amount',
        totalBuyTotalCost: 'port_total_buy_total_cost',
        totalDollarBuyTotalCost: 'port_total_dollar_buy_total_cost',
        totalNetMarketValue: 'port_total_net_market_value',
        totalDollarNetMarketValue: 'port_total_dollar_net_market_value',
        totalRawValue: 'port_total_raw_value',
        totalDollarRawValue: 'port_total_dollar_raw_value',
        totalNetGp: 'port_total_net_gp',
        totalDollarNetGp: 'port_total_dollar_net_gp',

        id: 'port_title_id',
        titleSymbol: 'port_title_symbol',
        titleDesc: 'port_title_desc',
        stockPrice: 'port_stock_price',
        stockInFolio: 'port_stocks_in_folio',
        avgBuyPrice: 'port_avg_buy_price',
        buyTotalCost: 'port_buy_total_cost',
        dollarBuyTotalCost: 'port_dollar_buy_total_cost',
        marketNetValue: 'port_market_net_value',
        dollarMarketNetValue: 'port_dollar_market_net_value',
        rawValue: 'port_raw_value',
        dollarRawValue: 'port_dollar_raw_value',
        rawSells: 'port_raw_sells',
        dollarRawSells: 'port_dollar_raw_sells',
        netGp: 'port_net_gp',
        dollarNetGp: 'port_dollar_net_gp',
        variation: 'port_variation',
        dollarVariation: 'port_dollar_variation',
        percentageInFolio: 'port_percentage_in_folio'
    }
}