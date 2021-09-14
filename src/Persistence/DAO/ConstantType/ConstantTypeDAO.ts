import { ConstantType } from "@Common/Entities/ConstantType";
import { BatchQueryData } from "@Persistence/Database/QueryBuilder";
import { UserInputError } from "apollo-server-errors";
import { DAO } from "../DAO";
import { IConstantTypeDAO } from "./IConstantTypeDAO";

export class ConstantTypeDAO extends DAO<ConstantType> implements IConstantTypeDAO {
    
    constructor() {
        super(new ConstantType());
    }

    async create(entity: ConstantType): Promise<ConstantType> {
        console.info('Creating Constant Type', entity);
        return this.database.create(entity);
    }

    async get(where?: ConstantType, limit?: number, skip?: number, batch?: BatchQueryData, block?: string): Promise<ConstantType[]> {
        console.info('Getting Constant Types', where);
        if (where != undefined) {
            return this.database.get({ where, limit, skip, batch });
        }
        return Promise.resolve([]);
    }

    async update(where: ConstantType, entity: ConstantType): Promise<ConstantType> {
        console.info('Updating Constant Type', where, entity);
        return this.database.update(where, entity);
    }

    async delete(entity: ConstantType): Promise<number> {
        console.log('Deleting Constant Type');
        return this.database.delete(entity);
    }
}