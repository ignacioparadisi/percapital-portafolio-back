import {Command} from "@Logic/Commands/Command";
import {ConstantType} from "@Common/Entities/ConstantType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetConstantTypesCommand extends Command<ConstantType>{
    constructor(private where: ConstantType, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createConstantTypeDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
