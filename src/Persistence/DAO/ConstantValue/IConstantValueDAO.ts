import { ConstantValue } from "@Common/Entities/ConstantValue";
import { IDAO } from "../IDAO";

export interface IConstantValueDAO extends IDAO<ConstantValue> {
    create(entity: ConstantValue): Promise<ConstantValue>;

    get(
        where?: ConstantValue,
        limit?: number,
        skip?: number
    ): Promise<ConstantValue[]>;

    update(where: ConstantValue, entity: ConstantValue): Promise<ConstantValue>;

    delete(entity: ConstantValue): Promise<number>;
}