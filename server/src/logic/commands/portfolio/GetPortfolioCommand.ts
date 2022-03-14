
import { Portfolio } from "@Common/entities/Portfolio";
import { PortfolioDAO } from "@Persistence/dao/portfolio/PortfolioDAO";
import { Command } from "../Command";

export class GetPortfolioCommand extends Command<Portfolio, Portfolio[]> {

    private limit?: number;
    private offset?: number;

    constructor(operation: Portfolio, limit?: number, offset?: number) {
        super(operation);
        this.limit = limit;
        this.offset = offset;
    }

    execute() {
        return new PortfolioDAO().get(this.params, this.limit, this.offset);
    }
}