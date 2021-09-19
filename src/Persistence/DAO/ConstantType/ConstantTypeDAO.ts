import { ConstantType } from "@Common/Entities/ConstantType";
import { Database } from "@Persistence/Database/DB";
import { DAO } from "../DAO";
import { IConstantTypeDAO } from "./IConstantTypeDAO";

export class ConstantTypeDAO extends DAO<ConstantType> implements IConstantTypeDAO {

    async create(entity: ConstantType): Promise<ConstantType> {
        console.info('Creating Constant Type', entity);
        let result = await Database.shared.execute('SELECT * FROM Constant_Type') as ConstantType[];
        return result[0];
    }

    async get(where?: ConstantType, limit?: number, skip?: number): Promise<ConstantType[]> {
        let result = await Database.shared.execute('SELECT * FROM Constant_Type');
        return result as ConstantType[];
    }

    async update(where: ConstantType, entity: ConstantType): Promise<ConstantType> {
        console.info('Updating Constant Type', where, entity);
        return new ConstantType();
    }

    async delete(entity: ConstantType): Promise<number> {
        console.log('Deleting Constant Type');
        return 0;
    }
}