const { gql } = require('apollo-server');

module.exports ={
    StockHistoricTypeDef: gql`
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
        
        type Prediction {
            futurePrice: Float
            days: Int
        }

        input StockHistoricInput {
            symbol: String
        }

        type Query {
            getStockFromBVC: [StockHistoric]
            getStockHistoricBySymbol(symbol: String, interval: String): [StockHistoric]
            getPrediction(symbol: String): Prediction
        }
    `
}