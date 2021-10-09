import { gql } from 'apollo-server';

export const ExchangeRateTypeDef = gql`
    type ExchangeRate {
        id: Int
        value: Float
        createdAt: String
        priceRvs(where: PriceRVInput, limit: Int): [PriceRV]
    }

    input ExchangeRateInput {
        id: Int
        value: Float
        createdAt: String
    }

    type Query {
        getExchangeRates(where: ExchangeRateInput, skip: Int, limit: Int): [ExchangeRate]
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
