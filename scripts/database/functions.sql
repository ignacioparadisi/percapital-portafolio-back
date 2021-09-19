/* Get constant types function with all the values associated.
If id passed is null then it will return all constant types with their constant values associated*/ 

create or replace function get_constant_types (c_type_id integer) 
    returns table ( 
        ct_id int,
        ct_name varchar,
        ct_created_at timestamp,
        cv_id int,
        cv_value numeric,
        cv_created_at timestamp
    ) 
    language plpgsql
as $$
declare 
begin
    if c_type_id is null then
        return query
            select constant_type.id, constant_type.name, constant_type.created_at, 
	        constant_value.id, constant_value.value, constant_value.created_at from constant_type, constant_value 
	        where constant_type.id = constant_value.constant_type_id order by constant_type.id;
    end if;

    return query
            select constant_type.id, constant_type.name, constant_type.created_at, 
	        constant_value.id, constant_value.value, constant_value.created_at from constant_type, constant_value 
	        where constant_type.id = c_type_id and constant_type.id = constant_value.constant_type_id order by constant_type.id;

end; $$ 