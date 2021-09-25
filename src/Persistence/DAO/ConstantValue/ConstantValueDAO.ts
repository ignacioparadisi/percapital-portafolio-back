import { ConstantValue } from "@Common/Entities/ConstantValue";
import { decodeMultiple } from "@Common/Utils/decodable";
import { Database } from "@Persistence/Database/DB";
import { ConstantDBFunctions } from "@Persistence/Database/Functions/ConstantDBFunctions";
import { DAO } from "../DAO";
import { IConstantValueDAO } from "./IConstantValueDAO";

export class ConstantValueDAO extends DAO<ConstantValue> implements IConstantValueDAO {
    async create(entity: ConstantValue): Promise<ConstantValue> {
        console.info('Creating Constant Value', entity);
        let result = await Database.shared.execute('SELECT * FROM Constant_Type') as ConstantValue[];
        return result[0];
    }

    async get(where?: ConstantValue, limit?: number, skip?: number): Promise<ConstantValue[]> {
        console.info('Getting constant values', where);
        if (!where?.constantTypeId) {
            return []
        }
        let query = ConstantDBFunctions.getValues(where!.constantTypeId!);
        let result = await Database.shared.execute(query);
        return decodeMultiple(result, ConstantValue);
    }

    async update(where: ConstantValue, entity: ConstantValue): Promise<ConstantValue> {
        console.info('Updating Constant Type', where, entity);
        return new ConstantValue();
    }

    async delete(entity: ConstantValue): Promise<number> {
        console.log('Deleting Constant Type');
        return 0;
    }
}