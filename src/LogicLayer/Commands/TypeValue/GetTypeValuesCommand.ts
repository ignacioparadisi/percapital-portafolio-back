import {Command} from "@Logic/Commands/Command";
import {TypeValue} from "@Common/Entities/TypeValue";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetTypeValuesCommand extends Command<TypeValue>{
    constructor(private where: TypeValue, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createTypeValueDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
