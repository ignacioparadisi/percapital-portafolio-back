import {gql} from 'apollo-server';

export const PriceRVTypeDef = gql`
    type PriceRV {
        id: Int
        titleId: Int
        exchangeRateId: Int
        bolivaresPrice: Float
        closePrice: Float
        createdAt: String
        closeDate: String
        latestExchangeRate: Float
        operations(where: OperationInput, limit: Int): [Operation]
        exchangeRate(where: ExchangeRateInput): ExchangeRate
        stockTitle(where: StockTitleInput): StockTitle
    }

    input PriceRVInput {
        id: Int
        titleId: Int
        exchangeRateId: Int
        bolivaresPrice: Float
        closePrice: Float
        createdAt: String
        closeDate: String
    }

    type PriceRVPage {
        data: [PriceRV]
        total: Int
    }

    type Query {
        getPriceRVs(where: PriceRVInput, skip: Int, limit: Int): PriceRVPage
            @auth(requires: USER)
    }

    type Mutation {
        createPriceRV(insertData: PriceRVInput!): PriceRV
            @auth(requires: USER)
        updatePriceRV(where: PriceRVInput!, updateData: PriceRVInput!): [PriceRV]
            @auth(requires: USER)
        deletePriceRV(deleteData: PriceRVInput): Int
            @auth(requires: USER)
    }
`
