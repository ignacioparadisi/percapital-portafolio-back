const { gql } = require('apollo-server');

module.exports ={
    StockHistoricTypeDef: gql`
        type StockHistoric {
            id: Int
            symbol: String
            symbolDescription: String
            date: String
            closePrice: Float
            openPrice: Float
            highPrice: Float
            lowPrice: Float
            volume: String
            change: String
        }

        type PredictionData {
            x: [String]
            y: [Float]
        }
        
        type Prediction {
            symbol: String
            futurePrice: Float
            lookUpDays: Int
            trueData: PredictionData
            data: PredictionData
        }

        input StockHistoricInput {
            symbol: String!
            date: String
            closePrice: Float!
            openPrice: Float
            highPrice: Float
            lowPrice: Float
            volume: String
            change: String
        }

        type Query {
            getStockFromBVC: [StockHistoric]
            getStockHistoricBySymbol(symbol: String!, interval: String): [StockHistoric]
            getPrediction(symbol: String!, lookUpDays: Int!): Prediction
            getTodayStocks: [StockHistoric]
        }
        
        type Mutation {
            createStockHistoric(insertData: [StockHistoricInput]): [StockHistoric]
        }
    `
}