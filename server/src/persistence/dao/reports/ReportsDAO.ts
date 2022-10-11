import { Report } from "@Common/entities/Report";
import { GeneralError } from "@Common/errors/GeneralError";
import { Database } from "@Persistence/database/DB";
import { ReportsDBFunctions } from "@Persistence/database/functions/ReportsDBFunctions";
import { DAO } from "../DAO";
import { IReportsDAO } from "./IReportsDAO";

export class ReportsDAO extends DAO<Report> implements IReportsDAO {
    async create(entity: Report): Promise<Report> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async delete(entity: Report): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where?: Report, limit?: number, skip?: number): Promise<Report[]> {
        let query = ReportsDBFunctions.getReports();
        let result = await Database.shared.execute(query, Report);
        return result;
    }

    async update(where: Report, entity: Report): Promise<Report> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}