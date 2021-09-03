import {mergeResolvers} from "@graphql-tools/merge";
export const resolvers = mergeResolvers([
    ConstantTypeResolver,
    TypeValueResolver,
    StockExchangeTitleResolver,
    PriceRvResolver,
    ExchangeRateResolver,
    OperationResolver
])