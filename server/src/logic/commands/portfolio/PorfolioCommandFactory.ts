import { Portfolio } from "@Common/entities/Portfolio";
import { GetPortfolioCommand } from "./GetPortfolioCommand";

export class PortfolioCommandFactory {

    static createGetPortfolioCommand(portfolio: Portfolio, limit?: number, offset?: number) {
        return new GetPortfolioCommand(portfolio, limit, offset);
    }
}