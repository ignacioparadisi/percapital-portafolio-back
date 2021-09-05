import {mergeResolvers} from "@graphql-tools/merge";
export const resolvers = mergeResolvers([
    ConstantTypeResolver,
    TypeValueResolver,
    OperationResolver,
    OperationTypeResolver,
    StockExchangeTitleResolver,
    PriceRvResolver,
    ExchangeRateResolver
])