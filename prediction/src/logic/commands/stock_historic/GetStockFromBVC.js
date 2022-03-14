'use strict';

// import {StockHistoric} from "@Common/entities/StockHistoric";
const axios = require('axios');
// import {StockHistoricDAO} from "@Persistence/dao/stock_historic/StockHistoricDAO";

const url = 'https://www.bolsadecaracas.com/resumen-mercado/';

class GetStockFromBVCCommand {
    async execute() {
        let response = await axios.get(url)
        let data = response.data;
        let decodedData = this.decodeData(data);
        let stocks = decodedData?.map((stock) => {
            console.log(stock);
            return stock // StockHistoric(stock.symbol, stock.value);
        }) ?? [];
        return stocks // new StockHistoricDAO().createMultiple(stocks);
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