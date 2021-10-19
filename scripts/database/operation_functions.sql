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
    FROM Operation, Price_RV, Stock_Title 
    WHERE Operation.price_rv_id = Price_RV.id AND Operation.type_id = operation_type_id 
    AND Price_RV.title_id = Stock_Title.id AND Stock_Title.id = se_title_id;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

-- Get all sell operations made over history.
-- params:
---- `p_user_id`: ID of the user.
CREATE OR REPLACE FUNCTION get_sell_operations(p_user_id INTEGER, limit_number INTEGER, offset_value INTEGER)
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
        op_net_value NUMERIC,
        op_exchange_rate NUMERIC,
        op_raw_dollar_value NUMERIC,
        op_dollar_net_value NUMERIC
    )
AS
$$
BEGIN

    RETURN QUERY
        SELECT DISTINCT operation.id, operation.price_rv_id, operation.user_id, operation.type_id, operation.created_at, 
        stock_title.symbol, operation.stock_amount,
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
        FROM Operation, Price_RV, Stock_Title, Exchange_Rate, Operation_Type, 
        Constant_Value AS Register, Constant_Value AS IVA, Constant_Value AS Comission
        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = 2 -- Venta 
		AND Price_RV.title_id = Stock_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id 
        AND Register.id = Operation.register_cv_id AND IVA.id = Operation.iva_cv_id AND Comission.id = Operation.comission_cv_id
        LIMIT limit_number OFFSET offset_value;

END; 
$$ LANGUAGE plpgsql;

-- Get all buy operations made over history.
-- params:
---- `p_user_id`: ID of the user.
CREATE OR REPLACE FUNCTION get_buy_operations(p_user_id INTEGER, limit_number INTEGER, offset_value INTEGER)
    RETURNS TABLE (
        op_id INTEGER,
        op_price_rv_id BIGINT,
        op_user_id BIGINT,
        op_type_id BIGINT,
        op_created_at TIMESTAMP,
        op_title_value VARCHAR,
        op_stock_amount NUMERIC,
        op_stock_price NUMERIC(1000,5),
        op_value NUMERIC(1000,5),
        op_comission NUMERIC(1000,5),
        op_iva NUMERIC(1000,5),
        op_register_value NUMERIC(1000,5),
        op_total_cost NUMERIC(1000,5),
        op_unit_total_price NUMERIC(1000,5),
        op_exchange_rate NUMERIC(1000,5),
        op_dollar_total_cost NUMERIC(1000,5),
        op_dollar_unit_total_price NUMERIC(1000,5),
        op_market_price NUMERIC(1000,5),
        op_variation NUMERIC(1000,5),
        op_market_value NUMERIC(1000,5),
        op_comission_percentage NUMERIC(1000,5),
        op_iva_percentage NUMERIC(1000,5),
        op_register_percentage NUMERIC(1000,5),
        op_total_income NUMERIC(1000,5),
        op_gp_value NUMERIC(1000,5),
        op_performance_value NUMERIC(1000,5),
        op_weight_in_wallet NUMERIC(1000,5),
        op_weighted_performance NUMERIC(1000,5),
        op_dollar_gp NUMERIC(1000,5),
        op_dollar_performance_value NUMERIC(1000,5),
        op_dollar_weighted_performance NUMERIC(1000,5)
    )
AS
$$
DECLARE
    exchange_rate_value NUMERIC;
BEGIN
    SELECT * INTO exchange_rate_value FROM get_latest_exchange_rate_value();
    RETURN QUERY
        SELECT DISTINCT operation.id, operation.price_rv_id, operation.user_id, operation.type_id, operation.created_at, 
        stock_title.symbol, operation.stock_amount, operation.stock_price, 
        get_computed_value(operation.stock_price, operation.stock_amount) AS buy_value, 
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
        (360::NUMERIC / NULLIF((CURRENT_DATE - DATE(operation.created_at)), 0)) AS performance_value,


        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Title.id, Operation_Type.id) AS weight_in_wallet,

        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Title.id, Operation_Type.id) *
        (((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1)) / 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, 1)) *
        (360::NUMERIC / NULLIF((CURRENT_DATE - DATE(operation.created_at)), 0))) AS weighted_performance,

        (get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) / 
        exchange_rate_value) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value) AS dollar_gp,

        (((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) / 
        exchange_rate_value) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) / 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) *
        (360::NUMERIC / NULLIF((CURRENT_DATE - DATE(operation.created_at)), 0)) AS dollar_performance_value,

        ((((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission.value, iva.value, register.value, 0) / 
        exchange_rate_value) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) / 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission.value, iva.value, register.value, 1) / exchange_rate.value)) *
        (360::NUMERIC / NULLIF((CURRENT_DATE - DATE(operation.created_at)), 0))) * 
        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Title.id, Operation_Type.id) AS dollar_weighted_performance

        FROM Operation, Price_RV, Stock_Title, Exchange_Rate, Operation_Type,
        Constant_Value AS Register, Constant_Value AS IVA, Constant_Value AS Comission

        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = Operation_Type.id 
		AND Operation.type_id = 1 -- Compra 
        AND Price_RV.title_id = Stock_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id
        AND Register.id = Operation.register_cv_id AND IVA.id = Operation.iva_cv_id AND Comission.id = Operation.comission_cv_id
        LIMIT limit_number OFFSET offset_value;

END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_operation_type(opt_id INTEGER) 
    RETURNS TABLE(
        ot_id INTEGER,
        ot_name VARCHAR
    )
AS $$
BEGIN 
    RETURN QUERY SELECT id, name FROM Operation_Type WHERE id = opt_id;
END;
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

-- Create an Operation
CREATE OR REPLACE FUNCTION create_operation(ope_price_rv_id INTEGER, ope_user_id INTEGER, ope_stock_amount NUMERIC, ope_stock_price NUMERIC, 
    ope_type_id INTEGER, ope_iva_cv_id INTEGER, ope_comission_cv_id INTEGER, ope_register_cv_id INTEGER, ope_created_at TIMESTAMP)
    RETURNS TABLE(
        op_id INTEGER,
        op_price_rv_id BIGINT,
        op_user_id BIGINT,
        op_created_at TIMESTAMP,
        op_stock_amount NUMERIC,
        op_stock_price NUMERIC,
        op_type_id BIGINT
    )
AS $$
BEGIN
    IF ope_created_at IS NULL THEN
        RETURN QUERY INSERT INTO Operation(price_rv_id, user_id, stock_amount, stock_price, type_id, iva_cv_id, comission_cv_id, register_cv_id)
            VALUES (ope_price_rv_id, ope_user_id, ope_stock_amount, ope_stock_price, ope_type_id, ope_iva_cv_id, ope_comission_cv_id, ope_register_cv_id)
            RETURNING id, price_rv_id, user_id, created_at, stock_amount, stock_price, type_id;
    ELSE

    RETURN QUERY INSERT INTO Operation(price_rv_id, user_id, stock_amount, stock_price, type_id, iva_cv_id, comission_cv_id, register_cv_id, created_at)
            VALUES (ope_price_rv_id, ope_user_id, ope_stock_amount, ope_stock_price, ope_type_id, ope_iva_cv_id, ope_comission_cv_id, ope_register_cv_id, ope_created_at)
            RETURNING id, price_rv_id, user_id, created_at, stock_amount, stock_price, type_id;
    
    END IF;
END;
$$ LANGUAGE plpgsql;