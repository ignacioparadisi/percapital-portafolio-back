import { Operation } from "@Common/Entities/Operation";
import { OperationType } from "@Common/Entities/OperationType";
import { decodeMultiple } from "@Common/Utils/decodable";
import { Database } from "@Persistence/Database/DB";
import { OperationsDBFunctions } from "@Persistence/Database/Functions/OperationsDBFunctions";
import { IOperationsDAO } from "./IOperationsDAO";

export class OpertaionsDAO implements IOperationsDAO {
    create(entity: Operation): Promise<Operation> {
        return Promise.reject('Method not implemented');
    }

    async get(where?: Operation, limit?: number, skip?: number): Promise<Operation[]> {
        if (!where?.userId) {
            return Promise.reject('User ID is required');
        }
        if (!where?.typeId) {
            return Promise.reject('Operation type ID is required');
        }
        let query = '';
        if (where.typeId == OperationType.SELL) {
            query = OperationsDBFunctions.getSellOperations(where.userId);
        } else {
            return Promise.reject('Operation type is not valid');
        }
        let results = await Database.shared.execute(query);
        return decodeMultiple(results, Operation);
    }

    update(where: Operation, entity: Operation): Promise<Operation> {
        return Promise.reject('Method not implemented');
    }

    delete(entity: Operation): Promise<number> {
        return Promise.reject('Method not implemented');
    }
}