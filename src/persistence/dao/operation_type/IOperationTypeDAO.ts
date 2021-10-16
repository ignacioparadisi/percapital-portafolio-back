import { OperationType } from "@Common/entities/OperationType";
import { IDAO } from "../IDAO";

export interface IOperationTypeDAO extends IDAO<OperationType> {

    getForOperation(
        where?: OperationType
      ): Promise<OperationType[]>;
}