import { ConstantType } from "@Common/entities/ConstantType";
import { GeneralError } from "@Common/errors/GeneralError";
import { Database } from "@Persistence/database/DB";
import { ConstantDBFunctions } from "@Persistence/database/functions/ConstantDBFunctions";
import { DAO } from "../DAO";
import { IConstantTypeDAO } from "./IConstantTypeDAO";

export class ConstantTypeDAO extends DAO<ConstantType> implements IConstantTypeDAO {

    async create(entity: ConstantType): Promise<ConstantType> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where?: ConstantType, limit?: number, skip?: number): Promise<ConstantType[]> {
        let query = ConstantDBFunctions.getConstants(where?.id);
        let result = await Database.shared.execute(query, ConstantType);
        return result;
    }

    async update(where: ConstantType, entity: ConstantType): Promise<ConstantType> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async delete(entity: ConstantType): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}