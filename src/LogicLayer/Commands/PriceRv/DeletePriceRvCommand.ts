import {Command} from "@Logic/Commands/Command";
import {PriceRv} from "@Common/Entities/PriceRv";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeletePriceRvCommand extends Command<number>{
    constructor(private deleteData: PriceRv) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createPriceRvDAO();
        return dao.delete(this.deleteData);
    }
}
