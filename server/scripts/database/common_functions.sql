
-- Login
-- params:
---- `user_email`: Email of the user
---- `user_password`: Encrypted password of the user
CREATE OR REPLACE FUNCTION login(user_email VARCHAR)
    RETURNS TABLE (
        usr_id INTEGER,
        usr_name VARCHAR,
        usr_email VARCHAR,
        usr_password VARCHAR,
        usr_role_id BIGINT
    )
AS $$
BEGIN
    RETURN QUERY SELECT id, name, email, password, role_id FROM Percapital_User WHERE email = user_email;
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

-- Create a new user
CREATE OR REPLACE FUNCTION create_user(user_name VARCHAR, user_email VARCHAR, user_password VARCHAR, user_role_id BIGINT)
    RETURNS TABLE (
        usr_id INTEGER,
        usr_name VARCHAR,
        usr_email VARCHAR,
        usr_role_id BIGINT,
        usr_created_at TIMESTAMP
    )
AS $$
DECLARE
    existing_user_id INTEGER;
BEGIN
    SELECT id INTO existing_user_id FROM Percapital_User WHERE email = user_email;
    IF existing_user_id IS NULL THEN
        RETURN QUERY INSERT INTO Percapital_User(name, email, password, role_id) VALUES (user_name, user_email, user_password, user_role_id) RETURNING id, name, email, role_id, created_at;
    ELSE
        RETURN;
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
        ct_created_at TIMESTAMP
    )
AS
$$ 
BEGIN
    IF c_type_id IS NULL THEN
        RETURN query
            SELECT constant_type.id, constant_type.name, constant_type.created_at FROM constant_type 
	        ORDER BY constant_type.id;
    END IF;

    RETURN query
            SELECT constant_type.id, constant_type.name, constant_type.created_at FROM constant_type 
	        WHERE constant_type.id = c_type_id ORDER BY constant_type.id;

END; 
$$ LANGUAGE plpgsql;

-- Gets all the values a constant has had over time.
-- params:
---- `c_type_id`: ID of the constant type.
CREATE OR REPLACE FUNCTION get_constant_values(c_type_id INTEGER) 
    RETURNS TABLE (
        cv_id INTEGER,
        cv_value NUMERIC,
        cv_constant_type_id BIGINT,
        cv_created_at TIMESTAMP
    )
AS
$$ 
BEGIN
    RETURN QUERY
            SELECT id, value, constant_type_id, created_at FROM constant_value
	        WHERE constant_type_id = c_type_id;

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

/******************************
*******************************
            INSERTS
*******************************
*******************************/

-- Create a Constant Value
CREATE OR REPLACE FUNCTION create_constant_value(selected_ct_id INTEGER, cv_input_value NUMERIC)
    RETURNS TABLE(
        cv_id INTEGER,
        cv_value NUMERIC,
        cv_constant_type_id BIGINT,
        cv_created_at TIMESTAMP
    )
AS $$
BEGIN
    RETURN QUERY INSERT INTO Constant_Value(constant_type_id, value) VALUES (selected_ct_id, cv_input_value) 
        RETURNING id, value, constant_type_id, created_at;
END;
$$ LANGUAGE plpgsql;