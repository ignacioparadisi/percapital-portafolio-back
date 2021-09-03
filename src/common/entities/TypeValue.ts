import {ConstantType} from '@Common/Entities/ConstantType';
import {Entity} from '@Common/Entities/Entity';
export class TypeValue extends Entity {
    tvId?: undefined;
    tvCtId?: undefined;
    tvValue?: undefined;
    tvCreationdate?: undefined;
    constantType?: ConstantType;

   constructor(entity?: TypeValue) {
        super(entity);
        this.tvId = entity ? entity.tvId : undefined;
        this.tvCtId = entity ? entity.tvCtId : undefined;
        this.tvValue = entity ? entity.tvValue : undefined;
        this.tvCreationdate = entity ? entity.tvCreationdate : undefined;
   }
}
