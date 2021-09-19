/* Get constant types function with all the values associated.
If id passed is null then it will return all constant types with their constant values associated*/ 

CREATE OR REPLACE function get_constant_types(c_type_id INTEGER) 
    RETURNS TABLE ( 
        ct_id INTEGER,
        ct_name VARCHAR,
        ct_created_at TIMESTAMP,
        cv_id INTEGER,
        cv_value NUMERIC,
        cv_created_at TIMESTAMP
    )
AS
$$ 
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

END; 
$$ LANGUAGE plpgsql;

/* Get constant values function from a constant type id*/ 
CREATE OR REPLACE FUNCTION get_constant_values(c_type_id INTEGER) 
    RETURNS TABLE (
        cv_id INTEGER,
        cv_value NUMERIC,
        cv_created_at TIMESTAMP
    )
AS
$$ 
BEGIN
    RETURN QUERY
            SELECT id, value, created_at FROM constant_value 
	        WHERE id = c_type_id;

END; 
$$ LANGUAGE plpgsql;
