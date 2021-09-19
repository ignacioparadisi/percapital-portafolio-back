/* Get constant types function with all the values associated.
If id passed is null then it will return all constant types with their constant values associated*/ 

CREATE OR REPLACE function get_constant_types (c_type_id INTEGER) 
    RETURNS TABLE ( 
        ct_id INTEGER,
        ct_name VARCHAR,
        ct_created_at TIMESTAMP,
        cv_id INTEGER,
        cv_value NUMERIC,
        cv_created_at TIMESTAMP
    ) 
    LANGUAGE plpgsql
AS $$
DECLARE 
BEGIN
    IF c_type_id IS NULL THEN
        RETURN query
            SELECT constant_type.id, constant_type.name, constant_type.created_at, 
	        constant_value.id, constant_value.value, constant_value.created_at FROM constant_type, constant_value 
	        WHERE constant_type.id = constant_value.constant_type_id ORDER BY constant_type.id;
    END IF;

    RETURN query
            SELECT constant_type.id, constant_type.name, constant_type.created_at, 
	        constant_value.id, constant_value.value, constant_value.created_at FROM constant_type, constant_value 
	        WHERE constant_type.id = c_type_id AND constant_type.id = constant_value.constant_type_id ORDER BY constant_type.id;

end; $$ 

/* Get constant values function from a constant type id*/ 
create or replace function get_constant_values (c_type_id integer) 
    returns table (
        cv_id int,
        cv_value numeric,
        cv_created_at timestamp
    ) 
    language plpgsql
as $$
declare 
begin
    return query
            select id, value, created_at from constant_value 
	        where id = c_type_id;

end; $$ 
