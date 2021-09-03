import {Command} from "@Logic/Commands/Command";
import {TypeValue} from "@Common/Entities/TypeValue";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreateTypeValueCommand extends Command<TypeValue>{
    constructor(private insertData: TypeValue) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createTypeValueDAO();
        return dao.create(this.insertData);
    }
}
