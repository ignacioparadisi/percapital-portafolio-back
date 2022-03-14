const { mergeResolvers } = require("@graphql-tools/merge");
const { StockHistoricResolver } = require("./StockHistoric");

module.exports = {
    resolvers: mergeResolvers([
        StockHistoricResolver
    ])
}