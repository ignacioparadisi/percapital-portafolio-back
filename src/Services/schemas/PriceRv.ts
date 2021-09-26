import {gql} from 'apollo-server';

export const PriceRVTypeDef = gql`
    type PriceRV {
        id: Int
        setId: Int
        exrId: Int
        bolivaresPrice: Float
        createdAt: String
        closeDate: String
        operations(where: OperationInput, limit: Int): [Operation]
        exchangeRate(where: ExchangeRateInput): ExchangeRate
        stockExchangeTitle(where: StockExchangeTitleInput): StockExchangeTitle
    }

    input PriceRVInput {
        id: Int
        setId: Int
        exrId: Int
        bolivaresPrice: Float
        createdAt: String
        closeDate: String
    }

    type Query {
        getPriceRVs(where: PriceRVInput, skip: Int, limit: Int): [PriceRV]
    }

    type Mutation {
        createPriceRV(insertData: PriceRVInput!): PriceRV
        updatePriceRV(where: PriceRvInput!, updateData: PriceRvInput!): [PriceRV]
        deletePriceRV(deleteData: PriceRVInput): Int
    }
`
