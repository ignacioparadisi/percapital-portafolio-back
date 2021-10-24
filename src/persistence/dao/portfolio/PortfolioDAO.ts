import { Portfolio } from "@Common/entities/Portfolio";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { PortfolioDBFuctions } from "@Persistence/database/functions/PortfolioDBFunctions";
import { IPortfolioDAO } from "./IPortfolioDAO";

export class PortfolioDAO implements IPortfolioDAO {
    create(entity: Portfolio): Promise<Portfolio> {
        throw new Error("Method not implemented.");
    }
    async get(where?: Portfolio, limit?: number, skip?: number): Promise<Portfolio[]> {
        if (!where?.userId) {
            throw new RequiredFieldError('userId');
        }
        let query = PortfolioDBFuctions.getPortfolio(where.userId);
        let result = await Database.shared.execute(query, Portfolio);
        return result;
    }
    update(where: Portfolio, entity: Portfolio): Promise<Portfolio> {
        throw new Error("Method not implemented.");
    }
    delete(entity: Portfolio): Promise<number> {
        throw new Error("Method not implemented.");
    }
    
}