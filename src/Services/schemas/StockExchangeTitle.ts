import { gql } from 'apollo-server';

export const StockExchangeTitleTypeDef = gql`
    type StockExchangeTitle {
        id: Int
        description: String
        value: String
        createdAt: String
        priceRvs(where: PriceRvInput, limit: Int): [PriceRV]
    }

    input StockExchangeTitleInput {
        id: Int
        description: String
        value: String
        createdAt: String
    }

    type Query {
        getStockExchangeTitles(where: StockExchangeTitleInput, skip: Int, limit: Int): [StockExchangeTitle]
    }

    type Mutation {
        createStockExchangeTitle(insertData: StockExchangeTitleInput!): StockExchangeTitle
        updateStockExchangeTitle(where: StockExchangeTitleInput!, updateData: StockExchangeTitleInput!): [StockExchangeTitle]
        deleteStockExchangeTitle(deleteData: StockExchangeTitleInput): Int
    }
`
