import { gql } from 'apollo-server';

export const ExchangeRateTypeDef = gql`
    type ExchangeRate {
        id: Int
        value: Float
        createdAt: String
        priceRvs(where: PriceRVInput, limit: Int): [PriceRV]
    }

    type ExchangeRatePage {
        data: [ExchangeRate]
        total: Int
    }

    input ExchangeRateInput {
        id: Int
        value: Float
        createdAt: String
    }

    type Query {
        getExchangeRates(where: ExchangeRateInput, skip: Int, limit: Int): ExchangeRatePage
            @auth(requires: USER)

        getLatestExchangeRate: ExchangeRate
            @auth(requires: USER)
    }
    
    type Mutation {
        createExchangeRate(insertData: ExchangeRateInput!): ExchangeRate
            @auth(requires: USER)
        updateExchangeRate(where: ExchangeRateInput!, updateData: ExchangeRateInput!): [ExchangeRate]
            @auth(requires: USER)
        deleteExchangeRate(deleteData: ExchangeRateInput): Int
            @auth(requires: USER)
    }
`
