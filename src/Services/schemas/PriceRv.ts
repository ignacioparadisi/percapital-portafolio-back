import {gql} from 'apollo-server';
export const PriceRvTypeDef = gql`
    type PriceRv {
        prId: undefined
        prStId: undefined
        prErId: undefined
        prBolivaresprice: undefined
        prCreationdate: undefined
        prClosedate: undefined
        operations(where: OperationInput, limit: Int): [Operation]
        operations(where: OperationInput, limit: Int): [Operation]
        operations(where: OperationInput, limit: Int): [Operation]
        exchangeRate(where: ExchangeRateInput): ExchangeRate
        stockExchangeTitle(where: StockExchangeTitleInput): StockExchangeTitle
    }

    input PriceRvInput {
        prId: undefined
        prStId: undefined
        prErId: undefined
        prBolivaresprice: undefined
        prCreationdate: undefined
        prClosedate: undefined
    }

    type Query {
        getPriceRvs(where: PriceRvInput, skip:Int, limit: Int): [PriceRv]
    }
    type Mutation {
        createPriceRv(insertData: PriceRvInput!): PriceRv
        updatePriceRv(where: PriceRvInput! updateData: PriceRvInput!): [PriceRv]
        deletePriceRv(deleteData: PriceRvInput): Int
    }
`
