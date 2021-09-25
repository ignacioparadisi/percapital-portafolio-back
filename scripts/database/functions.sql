
-- Login
-- params:
---- `user_email`: Email of the user
---- `user_password`: Encrypted password of the user
CREATE OR REPLACE FUNCTION login(user_email VARCHAR, user_password VARCHAR)
    RETURNS TABLE (
        usr_id INTEGER,
        usr_name VARCHAR,
        usr_email VARCHAR,
        usr_role_id INTEGER
    )
AS $$
BEGIN
    RETURN QUERY SELECT id, name, email, role_id FROM Percapital_User WHERE email = user_email AND password = user_password;
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
        RETURN QUERY SELECT id, name FROM Percapital_Role WHERE id = role_id;
    ELSE
        RETURN QUERY SELECT id, name FROM Percapital_Role;
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

-- Gets the value at what the stock was selled.
-- params:
---- `stock_price`: Price of the stock sat the moment when it was selled.
---- `stock_amount`: Amount of stocks selled.
CREATE OR REPLACE FUNCTION get_sell_value(stock_price NUMERIC, stock_amount NUMERIC)
    RETURNS NUMERIC
AS
$$
BEGIN
    RETURN stock_price * stock_amount;
END; 
$$ LANGUAGE plpgsql;

-- Get all sell operations made over history.
-- params:
---- `p_user_id`: ID of the user.
CREATE OR REPLACE FUNCTION get_sell_operations(p_user_id INTEGER)
    RETURNS TABLE (
        sell_id INTEGER,
        sell_date TIMESTAMP,
        value VARCHAR,
        actions_quantity NUMERIC,
        sell_price NUMERIC,
        sell_value NUMERIC,
        comission NUMERIC,
        iva NUMERIC,
        register_value NUMERIC,
        net_sell NUMERIC,
        exchange_rate NUMERIC,
        dollar_raw_sell NUMERIC,
        dollar_net_sell NUMERIC
    )
AS
$$
DECLARE
    comission_constant NUMERIC;
    iva_constant NUMERIC;
    register_constant NUMERIC;
BEGIN
    iva_constant := get_last_value_constant(1);
    comission_constant := get_last_value_constant(2);
    register_constant := get_last_value_constant(3);

    RETURN QUERY
        SELECT operation.id, price_rv.created_at, stock_exchange_title.value, operation.stock_amount,
        operation.stock_price, get_sell_value(operation.stock_price, operation.stock_amount) AS sell_value, 
        get_sell_value(operation.stock_price, operation.stock_amount) * comission_constant AS comission, 
		get_sell_value(operation.stock_price, operation.stock_amount) * comission_constant * iva_constant AS iva, 
        get_sell_value(operation.stock_price, operation.stock_amount) * register_constant AS register_value, 
		get_sell_value(operation.stock_price, operation.stock_amount) - 
		(get_sell_value(operation.stock_price, operation.stock_amount) * comission_constant) - 
		(get_sell_value(operation.stock_price, operation.stock_amount) * comission_constant * iva_constant) - 
		(get_sell_value(operation.stock_price, operation.stock_amount) * register_constant) AS net_sell,
        exchange_rate.value AS exchange_rate, 
		get_sell_value(operation.stock_price, operation.stock_amount) / exchange_rate.value AS raw_dollar_sell, 
		(get_sell_value(operation.stock_price, operation.stock_amount) - 
        (get_sell_value(operation.stock_price, operation.stock_amount) * comission_constant) - 
		(get_sell_value(operation.stock_price, operation.stock_amount) * comission_constant * iva_constant) - 
		(get_sell_value(operation.stock_price, operation.stock_amount) * register_constant)) / exchange_rate.value AS dolar_net_sell
        FROM Operation, Price_RV, Stock_Exchange_Title, Exchange_Rate, Operation_Type
        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = 2 -- Venta 
		AND Price_RV.title_id = Stock_Exchange_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id;

END; 
$$ LANGUAGE plpgsql;
