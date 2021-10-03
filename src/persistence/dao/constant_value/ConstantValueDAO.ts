import { ConstantValue } from "@Common/entities/ConstantValue";
import { GeneralError } from "@Common/errors/GeneralError";
import { Database } from "@Persistence/database/DB";
import { ConstantDBFunctions } from "@Persistence/database/functions/ConstantDBFunctions";
import { DAO } from "../DAO";
import { IConstantValueDAO } from "./IConstantValueDAO";

export class ConstantValueDAO extends DAO<ConstantValue> implements IConstantValueDAO {
    async create(entity: ConstantValue): Promise<ConstantValue> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where?: ConstantValue, limit?: number, skip?: number): Promise<ConstantValue[]> {
        console.info('Getting constant values', where);
        if (!where?.constantTypeId) {
            return []
        }
        let query = ConstantDBFunctions.getValues(where!.constantTypeId!);
        let result = await Database.shared.execute(query, ConstantValue);
        return result;
    }

    async update(where: ConstantValue, entity: ConstantValue): Promise<ConstantValue> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async delete(entity: ConstantValue): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}