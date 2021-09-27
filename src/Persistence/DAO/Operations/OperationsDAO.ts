import { Operation } from "@Common/Entities/Operation";
import { OperationType } from "@Common/Entities/OperationType";
import { GeneralError } from "@Common/Errors/GeneralError";
import { RequiredFieldError } from "@Common/Errors/RequiredFieldError";
import { decodeMultiple } from "@Common/Utils/decodable";
import { Database } from "@Persistence/Database/DB";
import { OperationsDBFunctions } from "@Persistence/Database/Functions/OperationsDBFunctions";
import { IOperationsDAO } from "./IOperationsDAO";

export class OpertaionsDAO implements IOperationsDAO {
    create(entity: Operation): Promise<Operation> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where?: Operation, limit?: number, skip?: number): Promise<Operation[]> {
        if (!where?.userId) {
            throw new RequiredFieldError('userId');
        }
        if (!where?.typeId) {
            throw new RequiredFieldError('typeId');
        }
        let query = '';
        if (where.typeId == OperationType.SELL) {
            query = OperationsDBFunctions.getSellOperations(where.userId, limit, skip);
        } else {
            return Promise.reject('Operation type is not valid');
        }
        let result = await Database.shared.execute(query, Operation);
        return result;
    }

    update(where: Operation, entity: Operation): Promise<Operation> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: Operation): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}