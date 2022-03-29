'use strict';

const { StockHistoric } = require('../../../common/StockHistoric');
const axios = require('axios');
const {StockHistoricDAO} = require("../../../persistence/StockHistoricDAO");

const url = 'https://www.bolsadecaracas.com/resumen-mercado/';

class GetStockFromBVCCommand {
    async execute() {
        let response = await axios.get(url)
        let data = response.data;
        let decodedData = this.decodeData(data);
        console.log(decodedData);
        let stocks = decodedData?.map((stock) => {
            return new StockHistoric({ symbol: stock.symbol, closePrice: stock.value, date: new Date() });
        }) ?? [];
        let result = await new StockHistoricDAO().createMultiple(stocks).map(item => {
            return {
                id: item.sh_id,
                symbol: item.sh_symbol,
                date: item.sh_stock_date,
                closePrice: item.sh_close_price,
                openPrice: item.sh_open_price,
                highPrice: item.sh_high_price,
                lowPrice: item.sh_low_price,
                volume: item.sh_volume,
                change: item.sh_change
            }
        });
        return result;
    }

    decodeData(data) {
        let newString = data.replace(/\t/g, '');
        let lines = newString.split('\n');
        let filteredLines = lines.filter(line => {
            return line.includes(`$('#tbody-resumenmercado-todossimbolos').append('`)
        });
        if (filteredLines.length == 0) {
            return;
        }
        let htmlString = filteredLines[0];
        htmlString = htmlString.replace(`$('#tbody-resumenmercado-todossimbolos').append('`, '');
        htmlString = htmlString.slice(0, htmlString.length - 3);
        return this.getStocks(htmlString);
    }

    getStocks(data) {
        let stocks = [];
        let rows = data.split('<tr');
        for (let row of rows) {
            let nameMatch = row.match(/id="[a-zA-Z]+(?:\.[a-zA-Z]+)*"/);
            if (nameMatch) {
                let symbol = nameMatch[0].slice(4, nameMatch[0].length - 1);
                let columns = row.split('<td');
                let valueMatch = columns[3].match(/\.?\d+(?:\.\d+)*/);
                if (valueMatch) {
                    let value = parseFloat(valueMatch[0]);
                    stocks.push({
                        symbol,
                        value
                    })
                }
            }
        }
        return stocks;
    }
}

module.exports = {
    GetStockFromBVCCommand
}