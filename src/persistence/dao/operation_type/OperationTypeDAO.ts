import { OperationType } from "@Common/entities/OperationType";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { OperationTypeDBFunctions } from "@Persistence/database/functions/OperationTypeDBFunctions";
import { IOperationTypeDAO } from "./IOperationTypeDAO";

export class OperationTypeDAO implements IOperationTypeDAO {

    create(entity: OperationType): Promise<OperationType> {
        throw new Error("Method not implemented.");
    }

    async get(where?: OperationType, limit?: number, skip?: number): Promise<OperationType[]> {
        let query = OperationTypeDBFunctions.getOperationTypes();
        let result = await Database.shared.execute(query, OperationType);
        return result;
    }

    async getForOperation(where?: OperationType): Promise<OperationType[]> {
        if (!where?.id) {
            throw new RequiredFieldError('id');
        }
        let query = OperationTypeDBFunctions.getOperationTypeForOperation(where?.id);
        let result = await Database.shared.execute(query, OperationType);
        return result;
    }

    update(where: OperationType, entity: OperationType): Promise<OperationType> {
        throw new Error("Method not implemented.");
    }
    delete(entity: OperationType): Promise<number> {
        throw new Error("Method not implemented.");
    }
}