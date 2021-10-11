import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { IDAO } from "../IDAO";

export interface IExchangeRateDAO extends IDAO<ExchangeRate> {
    
    getById(where?: ExchangeRate): Promise<ExchangeRate[]>;
}