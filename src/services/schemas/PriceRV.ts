import {gql} from 'apollo-server';

export const PriceRVTypeDef = gql`
    type PriceRV {
        id: Int
        setId: Int
        exrId: Int
        bolivaresPrice: Float
        closePrice: Float
        createdAt: String
        closeDate: String
        operations(where: OperationInput, limit: Int): [Operation]
        exchangeRate(where: ExchangeRateInput): ExchangeRate
        stockTitle(where: StockTitleInput): StockTitle
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
