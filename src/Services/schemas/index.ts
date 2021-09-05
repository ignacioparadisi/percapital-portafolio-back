import {mergeTypeDefs} from "@graphql-tools/merge";
export const typeDefs = mergeTypeDefs([
    ConstantTypeTypeDef,
    TypeValueTypeDef,
    OperationTypeDef,
    OperationTypeTypeDef,
    StockExchangeTitleTypeDef,
    PriceRvTypeDef,
    ExchangeRateTypeDef
])