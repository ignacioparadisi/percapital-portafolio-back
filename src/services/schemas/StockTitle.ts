import { gql } from 'apollo-server';

export const StockTitleTypeDef = gql`
    type StockTitle {
        id: Int
        description: String
        value: String
        createdAt: String
        priceRvs(where: PriceRVInput, limit: Int): [PriceRV]
    }

    input StockTitleInput {
        id: Int
        description: String
        value: String
        createdAt: String
    }

    type Query {
        getStockTitles(where: StockTitleInput, skip: Int, limit: Int): [StockTitle] 
            @auth(requires: USER)
    }

    type Mutation {
        createStockTitle(insertData: StockTitleInput!): StockTitle
        updateStockTitle(where: StockTitleInput!, updateData: StockTitleInput!): [StockTitle]
        deleteStockTitle(deleteData: StockTitleInput): Int
    }
`
