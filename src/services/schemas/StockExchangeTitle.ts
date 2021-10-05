import { gql } from 'apollo-server';

export const StockExchangeTitleTypeDef = gql`
    type StockExchangeTitle {
        id: Int
        description: String
        value: String
        createdAt: String
        priceRvs(where: PriceRVInput, limit: Int): [PriceRV]
    }

    input StockExchangeTitleInput {
        id: Int
        description: String
        value: String
        createdAt: String
    }

    type Query {
        getStockExchangeTitles(where: StockExchangeTitleInput, skip: Int, limit: Int): [StockExchangeTitle] 
            @auth(requires: USER)
    }

    type Mutation {
        createStockExchangeTitle(insertData: StockExchangeTitleInput!): StockExchangeTitle
        updateStockExchangeTitle(where: StockExchangeTitleInput!, updateData: StockExchangeTitleInput!): [StockExchangeTitle]
        deleteStockExchangeTitle(deleteData: StockExchangeTitleInput): Int
    }
`
