
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

-- Gets the value at what the stock was bought/selled.
-- params:
---- `stock_price`: Price of the stock sat the moment when it was selled.
---- `stock_amount`: Amount of stocks selled.
CREATE OR REPLACE FUNCTION get_computed_value(stock_price NUMERIC, stock_amount NUMERIC)
    RETURNS NUMERIC
AS
$$
BEGIN
    RETURN stock_price * stock_amount;
END; 
$$ LANGUAGE plpgsql;

-- Gets the total value at what the stock was bought/selled.
-- params:
---- `stock_price`: Price of the stock sat the moment when it was selled.
---- `stock_amount`: Amount of stocks selled.
---- `comission_constant`: commission constant value.
---- `iva_constant`: iva constant value.
---- `register_constant`: register constant value.
---- `is_addition`: Condition to know if the constants need to be added or substracted.
CREATE OR REPLACE FUNCTION get_total_computed_value(stock_price NUMERIC, stock_amount NUMERIC, 
                                                    comission_constant NUMERIC, iva_constant NUMERIC,
                                                    register_constant NUMERIC, is_addition INTEGER)
    RETURNS NUMERIC
AS
$$
BEGIN

    if is_addition = 1 then 
        RETURN  get_computed_value(stock_price, stock_amount) + 
                (get_computed_value(stock_price, stock_amount) * comission_constant) + 
                (get_computed_value(stock_price, stock_amount) * comission_constant * iva_constant) + 
                (get_computed_value(stock_price, stock_amount) * register_constant);
    END IF;

    RETURN  get_computed_value(stock_price, stock_amount) - 
            (get_computed_value(stock_price, stock_amount) * comission_constant) - 
            (get_computed_value(stock_price, stock_amount) * comission_constant * iva_constant) - 
            (get_computed_value(stock_price, stock_amount) * register_constant);
END; 
$$ LANGUAGE plpgsql;

-- Get operations stock ammount by title.
-- params:
---- `se_title_id`: ID of the title.
---- `operation_type_id`: ID of the operation type.
CREATE OR REPLACE FUNCTION get_operations_stock_ammount_by_title(se_title_id INTEGER, operation_type_id INTEGER)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    SELECT SUM(operation.stock_amount) INTO return_value
    FROM Operation, Price_RV, Stock_Exchange_Title 
    WHERE Operation.price_rv_id = Price_RV.id AND Operation.type_id = operation_type_id 
    AND Price_RV.title_id = Stock_Exchange_Title.id AND Stock_Exchange_Title.id = se_title_id;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

-- Get the lastest exchange rate.
CREATE OR REPLACE FUNCTION get_latest_exchange_rate()
    RETURNS NUMERIC
AS
$$
DECLARE
    exchange_id NUMERIC;
    return_value NUMERIC;
BEGIN
    SELECT exchange_rate.id, exchange_rate.value INTO exchange_id, return_value
    FROM Exchange_Rate ORDER BY Exchange_Rate.id DESC LIMIT 1;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

-- Get all sell operations made over history.
-- params:
---- `p_user_id`: ID of the user.
CREATE OR REPLACE FUNCTION get_sell_operations(p_user_id INTEGER)
    RETURNS TABLE (
        op_id INTEGER,
        op_price_rv_id BIGINT,
        op_user_id BIGINT,
        op_type_id BIGINT,
        op_created_at TIMESTAMP,
        op_title_value VARCHAR,
        op_stock_amount NUMERIC,
        op_stock_price NUMERIC,
        op_value NUMERIC,
        op_comission NUMERIC,
        op_iva NUMERIC,
        op_register_value NUMERIC,
        op_net NUMERIC,
        op_exchange_rate NUMERIC,
        op_dollar_raw NUMERIC,
        op_dollar_net NUMERIC
    )
AS
$$
BEGIN

    RETURN QUERY
        SELECT DISTINCT operation.id, operation.price_rv_id, operation.user_id, operation.type_id, operation.created_at, 
        stock_exchange_title.value, operation.stock_amount,
        operation.stock_price, get_computed_value(operation.stock_price, operation.stock_amount) AS sell_value, 
        get_computed_value(operation.stock_price, operation.stock_amount) * comission.value AS comission, 
	    get_computed_value(operation.stock_price, operation.stock_amount) * comission.value * iva.value AS iva, 
        get_computed_value(operation.stock_price, operation.stock_amount) * register.value AS register_value, 
	    get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 0) AS net_sell,
        exchange_rate.value AS exchange_rate, 
	    get_computed_value(operation.stock_price, operation.stock_amount) / exchange_rate.value AS raw_dollar_sell, 
		get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 0) / exchange_rate.value AS dolar_net_sell
        FROM Operation, Price_RV, Stock_Exchange_Title, Exchange_Rate, Operation_Type, 
        Constant_Value AS Register, Constant_Value AS IVA, Constant_Value AS Comission
        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = 2 -- Venta 
		AND Price_RV.title_id = Stock_Exchange_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id 
        AND Register.id = Operation.register_cv_id AND IVA.id = Operation.iva_cv_id AND Comission.id = Operation.comission_cv_id;

END; 
$$ LANGUAGE plpgsql;

-- Get all buy operations made over history.
-- params:
---- `p_user_id`: ID of the user.
CREATE OR REPLACE FUNCTION get_buy_operations(p_user_id INTEGER)
    RETURNS TABLE (
        buy_id INTEGER,
        buy_date TIMESTAMP,
        value VARCHAR,
        actions_quantity NUMERIC,
        buy_price NUMERIC(1000,5),
        buy_value NUMERIC(1000,5),
        comission NUMERIC(1000,5),
        iva NUMERIC(1000,5),
        register_value NUMERIC(1000,5),
        total_cost NUMERIC(1000,5),
        unit_total_price NUMERIC(1000,5),
        exchange_rate NUMERIC(1000,5),
        dollar_total_cost NUMERIC(1000,5),
        dollar_unit_total_price NUMERIC(1000,5),
        market_price NUMERIC(1000,5),
        variation NUMERIC(1000,5),
        market_value NUMERIC(1000,5),
        comission_percentage NUMERIC(1000,5),
        iva_percentage NUMERIC(1000,5),
        register_percentage NUMERIC(1000,5),
        total_income NUMERIC(1000,5),
        gp_value NUMERIC(1000,5),
        performance_value NUMERIC(1000,5),
        weight_in_wallet NUMERIC(1000,5),
        weighted_performance NUMERIC(1000,5),
        dollar_gp NUMERIC(1000,5),
        dollar_performance_value NUMERIC(1000,5),
        dollar_weighted_performance NUMERIC(1000,5)
    )
AS
$$
BEGIN

    RETURN QUERY
        SELECT DISTINCT operation.id, operation.created_at, stock_exchange_title.value, operation.stock_amount,
        operation.stock_price, get_computed_value(operation.stock_price, operation.stock_amount) AS buy_value, 
        get_computed_value(operation.stock_price, operation.stock_amount) * comission.value AS comission, 
	    get_computed_value(operation.stock_price, operation.stock_amount) * comission.value * iva.value AS iva, 
        get_computed_value(operation.stock_price, operation.stock_amount) * register.value AS register_value,

	    get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1) AS total_cost,

        get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / operation.stock_amount AS unit_total_price,

        exchange_rate.value AS exchange_rate, 
	    
        get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value AS dollar_total_cost,

        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value) / operation.stock_amount AS dollar_unit_total_price,

        price_rv.close_price AS market_price,
        (price_rv.close_price - operation.stock_price) / operation.stock_price AS variation,
        get_computed_value(price_rv.close_price, operation.stock_amount) AS market_value,

        get_computed_value(price_rv.close_price, operation.stock_amount) * comission.value AS comission_percentage,
        
        get_computed_value(price_rv.close_price, operation.stock_amount) * comission.value * iva.value AS iva_percentage,

        get_computed_value(price_rv.close_price, operation.stock_amount) * register.value AS register_percentage,

        get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) AS total_income,

        get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1) AS gp_value,

        ((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1)) / 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at))) AS performance_value,


        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Exchange_Title.id, Operation_Type.id) AS weight_in_wallet,

        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Exchange_Title.id, Operation_Type.id) *
        (((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1)) / 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at)))) AS weighted_performance,

        (get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) / 
        get_latest_exchange_rate()) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value) AS dollar_gp,

        (((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) / 
        get_latest_exchange_rate()) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) / 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at))) AS dollar_performance_value,

        ((((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) / 
        get_latest_exchange_rate()) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) / 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at)))) * 
        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Exchange_Title.id, Operation_Type.id) AS dollar_weighted_performance

        FROM Operation, Price_RV, Stock_Exchange_Title, Exchange_Rate, Operation_Type,
        Constant_Value AS Register, Constant_Value AS IVA, Constant_Value AS Comission

        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = Operation_Type.id 
		AND Operation.type_id = 1 -- Compra 
        AND Price_RV.title_id = Stock_Exchange_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id
        AND Register.id = Operation.register_cv_id AND IVA.id = Operation.iva_cv_id AND Comission.id = Operation.comission_cv_id;

END; 
$$ LANGUAGE plpgsql;

-- Get Price RV by Operation
-- params:
---- `operation_id`: The ID of the operation
CREATE OR REPLACE FUNCTION get_price_rv(price_rv_id INTEGER) 
    RETURNS TABLE(
        pr_id INTEGER,
        pr_title_id BIGINT,
        pr_exchange_rate_id BIGINT,
        pr_bolivares_price NUMERIC,
        pr_close_price NUMERIC,
        pr_created_at TIMESTAMP,
        pr_close_date TIMESTAMP
    )
AS $$
BEGIN 
    RETURN QUERY SELECT id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date FROM Price_RV WHERE id = price_rv_id;
END;
$$ LANGUAGE plpgsql;