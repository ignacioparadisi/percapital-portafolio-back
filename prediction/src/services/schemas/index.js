const { mergeTypeDefs } = require("@graphql-tools/merge");
const { StockHistoricTypeDef } = require("./StockHistoric");

module.exports = {
    typeDefs: mergeTypeDefs([
        StockHistoricTypeDef
    ])
}