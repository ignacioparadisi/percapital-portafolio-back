import {Command} from "@Logic/Commands/Command";
import {PriceRv} from "@Common/Entities/PriceRv";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdatePriceRvCommand extends Command<PriceRv>{
    constructor(private where: PriceRv, private updateData: PriceRv) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createPriceRvDAO();
        return dao.update(this.where, this.updateData);
    }
}
