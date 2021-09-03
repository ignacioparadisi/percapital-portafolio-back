import {Command} from "@Logic/Commands/Command";
import {PriceRv} from "@Common/Entities/PriceRv";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreatePriceRvCommand extends Command<PriceRv>{
    constructor(private insertData: PriceRv) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createPriceRvDAO();
        return dao.create(this.insertData);
    }
}
