import { ConstantType } from "@Common/Entities/ConstantType";
import { GeneralError } from "@Common/Errors/GeneralError";
import { decode } from "@Common/Utils/decodable";
import { Database } from "@Persistence/Database/DB";
import { ConstantDBFunctions } from "@Persistence/Database/Functions/ConstantDBFunctions";
import { DAO } from "../DAO";
import { IConstantTypeDAO } from "./IConstantTypeDAO";

export class ConstantTypeDAO extends DAO<ConstantType> implements IConstantTypeDAO {

    async create(entity: ConstantType): Promise<ConstantType> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where?: ConstantType, limit?: number, skip?: number): Promise<ConstantType[]> {
        let query = ConstantDBFunctions.getConstants(where?.id);
        let result = await Database.shared.execute(query);
        return result.map(res => {
            return decode(res, ConstantType)
        })
    }

    async update(where: ConstantType, entity: ConstantType): Promise<ConstantType> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async delete(entity: ConstantType): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}