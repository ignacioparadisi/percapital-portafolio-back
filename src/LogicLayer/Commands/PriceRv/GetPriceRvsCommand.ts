import {Command} from "@Logic/Commands/Command";
import {PriceRv} from "@Common/Entities/PriceRv";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetPriceRvsCommand extends Command<PriceRv>{
    constructor(private where: PriceRv, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createPriceRvDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
