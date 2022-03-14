import { ConstantValue } from "@Common/entities/ConstantValue";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { ConstantDBFunctions } from "@Persistence/database/functions/ConstantDBFunctions";
import { DAO } from "../DAO";
import { IConstantValueDAO } from "./IConstantValueDAO";

export class ConstantValueDAO extends DAO<ConstantValue> implements IConstantValueDAO {
    async create(entity: ConstantValue): Promise<ConstantValue> {
        if (!entity.constantTypeId) {
            throw new RequiredFieldError('constantTypeId');
        }
        if (!entity.value) {
            throw new RequiredFieldError('value');
        }
        let query = ConstantDBFunctions.createValue(entity.constantTypeId, entity.value);
        let result = await Database.shared.execute(query, ConstantValue);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Error creating Constant Value');
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