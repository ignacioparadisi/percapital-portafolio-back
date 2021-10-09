import { PriceRV } from '@Common/entities/PriceRV';
import { OperationType } from '@Common/entities/OperationType';
import { Entity } from '@Common/entities/Entity';
import { Decodable } from '@Common/utils/Decodable';
export class Operation extends Entity implements Decodable {
    id?: number;
    userId?: number;
    priceRvId?: number;
    createdAt?: Date;
    stockAmount?: number;
    stockPrice?: number;
    typeId?: number;
    operationType?: OperationType;
    priceRV?: PriceRV;
    value?: number;
    comission?: number;
    iva?: number;
    register?: number;
    exchangeRate?: number;

    ivaCvId?: number;
    comissionCvId?: number;
    registerCvId?: number;

    // Variables for sell ops
    sellNetValue?: number;
    sellRawDollarValue?: number;
    sellDollarNetValue?: number;

    // Variables for buy ops
    buyTotalCost?: number;
    buyUnitTotalPrice?: number;
    buyDollarTotalCost?: number;
    buyDollarUnitTotalPrice?: number;
    buyMarketPrice?: number;
    buyVariation?: number;
    buyMarketValue?: number;
    buyComissionPercentage?: number;
    buyIvaPercentage?: number;
    buyRegisterPercentage?: number;
    buyTotalIncome?: number;
    buyGpValue?: number;
    buyPerformanceValue?: number;
    buyWeightInWallet?: number;
    buyWeightedPerformance?: number;
    buyDollarGp?: number;
    buyDollarPerformanceValue?: number;
    buyDollarWeightedPerformance?: number;

   constructor(entity?: Operation) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.userId = entity ? entity.userId : undefined;
        this.priceRvId = entity ? entity.priceRvId : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.stockAmount = entity ? entity.stockAmount : undefined;
        this.stockPrice = entity ? entity.stockPrice : undefined;
        this.typeId = entity ? entity.typeId : undefined;

        this.ivaCvId = entity ? entity.ivaCvId : undefined;
        this.comissionCvId = entity ? entity.comissionCvId : undefined;
        this.registerCvId = entity ? entity.registerCvId : undefined;

        this.value = entity ? entity.value : undefined;
        this.comission = entity ? entity.comission : undefined;
        this.iva = entity ? entity.iva : undefined;
        this.register = entity ? entity.register : undefined;
        this.exchangeRate = entity ? entity.exchangeRate : undefined;

        // Variables for sell ops
        this.sellNetValue = entity ? entity.sellNetValue : undefined;
        this.sellRawDollarValue = entity ? entity.sellRawDollarValue : undefined;
        this.sellDollarNetValue = entity ? entity.sellDollarNetValue : undefined;

         // Variables for buy ops
         this.buyTotalCost = entity ? entity.buyTotalCost : undefined;
         this.buyUnitTotalPrice = entity ? entity.buyUnitTotalPrice : undefined;
         this.buyDollarTotalCost = entity ? entity.buyDollarTotalCost : undefined;
         this.buyDollarUnitTotalPrice = entity ? entity.buyDollarUnitTotalPrice : undefined;
         this.buyMarketPrice = entity ? entity.buyMarketPrice : undefined;
         this.buyVariation = entity ? entity.buyVariation : undefined;
         this.buyMarketValue = entity ? entity.buyMarketValue : undefined;
         this.buyComissionPercentage = entity ? entity.buyComissionPercentage : undefined;
         this.buyIvaPercentage = entity ? entity.comission : undefined;
         this.buyRegisterPercentage = entity ? entity.buyRegisterPercentage : undefined;
         this.buyTotalIncome = entity ? entity.buyTotalIncome : undefined;
         this.buyGpValue = entity ? entity.buyGpValue : undefined;
         this.buyPerformanceValue = entity ? entity.buyPerformanceValue : undefined;
         this.buyWeightInWallet = entity ? entity.buyWeightInWallet : undefined;
         this.buyWeightedPerformance = entity ? entity.buyWeightedPerformance : undefined;
         this.buyDollarGp = entity ? entity.buyDollarGp : undefined;
         this.buyDollarPerformanceValue = entity ? entity.buyPerformanceValue : undefined;
         this.buyDollarWeightedPerformance = entity ? entity.buyWeightedPerformance : undefined;
   }

   codingKeys = {
        id: 'op_id',
        userId: 'op_user_id',
        priceRvId: 'op_price_rv_id',
        createdAt: 'op_created_at',
        stockAmount: 'op_stock_amount',
        stockPrice: 'op_stock_price',
        typeId: 'op_type_id',

        ivaCvId: 'op_iva_cv_id',
        comissionCvId: 'op_comission_cv_id',
        registerCvId: 'op_register_cv_id',

        // Common keys for buy/sell ops
        value: 'op_value',
        comission: 'op_comission',
        iva: 'op_iva',
        register: 'op_register_value',
        exchangeRate: 'op_exchange_rate',

        // Keys for sell ops
        sellNetValue: 'op_net_value',
        sellRawDollarValue: 'op_raw_dollar_value',
        sellDollarNetValue: 'op_dollar_net_value',

        // Keys for buy ops
        buyTotalCost: 'op_total_cost',
        buyUnitTotalPrice: 'op_unit_total_price',
        buyDollarTotalCost: 'op_dollar_total_cost',
        buyDollarUnitTotalPrice: 'op_dollar_unit_total_price',
        buyMarketPrice: 'op_market_price',
        buyVariation: 'op_variation',
        buyMarketValue: 'op_market_value',
        buyComissionPercentage: 'op_comission_percentage',
        buyIvaPercentage: 'op_iva_percentage',
        buyRegisterPercentage: 'op_register_percentage',
        buyTotalIncome: 'op_total_income',
        buyGpValue: 'op_gp_value',
        buyPerformanceValue: 'op_performance_value',
        buyWeightInWallet: 'op_weight_in_wallet',
        buyWeightedPerformance: 'op_weighted_performance',
        buyDollarGp: 'op_dollar_gp',
        buyDollarPerformanceValue: 'op_dollar_performance_value',
        buyDollarWeightedPerformance: 'op_dollar_weighted_performance'
   }
}
