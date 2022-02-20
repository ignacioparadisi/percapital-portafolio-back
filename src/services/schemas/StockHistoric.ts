import { gql } from 'apollo-server';

export const StockHistoricTypeDef = gql`
    type StockHistoric {
        id: Int
        symbol: String
        date: String
        closePrice: Float
        openPrice: Float
        highPrice: Float
        lowPrice: Float
        volume: String
        change: String
    }

    input StockHistoricInput {
        symbol: String
    }
    
    type Query {
        getStockFromBVC: [StockHistoric]
    }
`