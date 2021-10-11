
-- Login
-- params:
---- `user_email`: Email of the user
---- `user_password`: Encrypted password of the user
CREATE OR REPLACE FUNCTION login(user_email VARCHAR, user_password VARCHAR)
    RETURNS TABLE (
        usr_id INTEGER,
        usr_name VARCHAR,
        usr_email VARCHAR,
        usr_role_id BIGINT
    )
AS $$
BEGIN
    RETURN QUERY SELECT id, name, email, role_id FROM Percapital_User WHERE email = user_email AND password = user_password;
END;
$$ LANGUAGE plpgsql;

--- Get list of users or a user by id
CREATE OR REPLACE FUNCTION get_users(user_id INTEGER)
    RETURNS TABLE (
        usr_id INTEGER,
        usr_name VARCHAR,
        usr_email VARCHAR,
        usr_role_id BIGINT,
        usr_created_at TIMESTAMP
    )
AS $$
BEGIN
    IF user_id IS NULL THEN
        RETURN QUERY SELECT id, name, email, role_id, created_at FROM Percapital_User;
    ELSE
        RETURN QUERY SELECT id, name, email, role_id, created_at FROM Percapital_User WHERE id = user_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Gets all the roles if the `role_id` is NULL and a single role if an id is passed.
-- params:
---- `role_id`: Optional id of the role.
CREATE OR REPLACE FUNCTION get_roles(role_id INTEGER)
    RETURNS TABLE (
        rol_id INTEGER,
        rol_name VARCHAR
    )
AS $$
BEGIN
    IF role_id IS NULL THEN
        RETURN QUERY SELECT id, name FROM Percapital_Role;
    ELSE
        RETURN QUERY SELECT id, name FROM Percapital_Role WHERE id = role_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Gets a list with all constants or a constant type by id
-- params: 
---- `c_type_id`: ID of the constant type. If the ID is NULL, then it returns all the constant types.
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

-- Gets all the values a constant has had over time.
-- params:
---- `c_type_id`: ID of the constant type.
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

-- Gets the last value a constant has had.
-- params:
---- `c_type_id`: ID of the constant type.
CREATE OR REPLACE FUNCTION get_last_value_constant(c_type_id INTEGER)
    RETURNS NUMERIC
AS
$$
DECLARE
	cv_id INTEGER;
    cv_value NUMERIC; 
BEGIN
    SELECT constant_value.id, constant_value.value INTO cv_id, cv_value 
    FROM constant_value WHERE constant_value.constant_type_id = c_type_id
    ORDER BY constant_value.created_at DESC LIMIT 1;
    RETURN cv_value;
END; 
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_stock_titles(page_limit INTEGER, page_offset INTEGER)
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN
    IF page_limit IS NULL THEN
        RETURN QUERY SELECT * FROM Stock_Title;
    ELSIF page_offset IS NULL THEN
        RETURN QUERY SELECT * FROM Stock_Title LIMIT page_limit;
    ELSE
        RETURN QUERY SELECT * FROM Stock_Title LIMIT page_limit OFFSET page_offset;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_exchange_rates(page_limit INTEGER, page_offset INTEGER)
    RETURNS TABLE(
        er_id INTEGER,
        er_value NUMERIC,
        er_created_at TIMESTAMP
    )
AS $$
BEGIN
    IF page_limit IS NULL THEN
        RETURN QUERY SELECT * FROM Exchange_Rate;
    ELSIF page_offset IS NULL THEN
        RETURN QUERY SELECT * FROM Exchange_Rate LIMIT page_limit;
    ELSE
        RETURN QUERY SELECT * FROM Exchange_Rate LIMIT page_limit OFFSET page_offset;
    END IF;
END;
$$ LANGUAGE plpgsql;


/******************************
*******************************
            INSERTS
*******************************
*******************************/

-- Create a Title
CREATE OR REPLACE FUNCTION create_stock_title(title_name TEXT, title_symbol VARCHAR)
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN
    RETURN QUERY INSERT INTO Stock_Title(name, symbol) VALUES (title_name, title_symbol) 
        RETURNING id, name, symbol, created_at;
END;
$$ LANGUAGE plpgsql;

-- Create a Exchange Rate
CREATE OR REPLACE FUNCTION create_exchange_rate(exchange_value NUMERIC)
    RETURNS TABLE(
        er_id INTEGER,
        er_value NUMERIC,
        er_created_at TIMESTAMP
    )
AS $$
BEGIN
    RETURN QUERY INSERT INTO Exchange_Rate(value) VALUES (exchange_value) 
        RETURNING id, value, created_at;
END;
$$ LANGUAGE plpgsql;
