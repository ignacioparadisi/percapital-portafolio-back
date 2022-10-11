import {gql} from 'apollo-server';

export const ReportTypeDef = gql`
    type Report {
        id: Int
        symbol: String
        name: String
        createdAt: String
        changePercentage: Float
        latestPrice: Float
        buyChangePercentage: Float
        sellChangePercentage: Float
    }

    type Query {
        getReports: [Report]
            @auth(requires: USER)
    }
`
