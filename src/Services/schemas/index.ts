import {mergeTypeDefs} from "@graphql-tools/merge";
export const typeDefs = mergeTypeDefs([
    ConstantTypeTypeDef,
    TypeValueTypeDef,
    StockExchangeTitleTypeDef,
    PriceRvTypeDef,
    ExchangeRateTypeDef,
    OperationTypeDef
])