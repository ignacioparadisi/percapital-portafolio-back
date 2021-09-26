/* Get constant types function with all the values ASsociated.
If id pASsed is null then it will return all constant types with their constant values ASsociated*/ 

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

CREATE OR REPLACE FUNCTION get_last_value_constant(constant_type_name VARCHAR)
    RETURNS NUMERIC
AS
$$
DECLARE
	return_id INTEGER;
    return_value NUMERIC; 
BEGIN
    SELECT constant_value.id, constant_value.value INTO return_id, return_value 
    FROM constant_value, constant_type WHERE constant_type.name = constant_type_name AND constant_type.id = constant_value.constant_type_id 
    ORDER BY constant_value.id DESC LIMIT 1;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_computed_value(stock_price NUMERIC, stock_amount NUMERIC)
    RETURNS NUMERIC
AS
$$
BEGIN
    RETURN stock_price * stock_amount;
END; 
$$ LANGUAGE plpgsql;

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

/* Get sell operations for user */

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
    comission_constant := get_last_value_constant('Comisión');
    iva_constant := get_last_value_constant('IVA');
    register_constant := get_last_value_constant('Registro');

    RETURN QUERY
        SELECT operation.id, operation.created_at, stock_exchange_title.value, operation.stock_amount,
        operation.stock_price, get_computed_value(operation.stock_price, operation.stock_amount) AS sell_value, 
        get_computed_value(operation.stock_price, operation.stock_amount) * comission_constant AS comission, 
	    get_computed_value(operation.stock_price, operation.stock_amount) * comission_constant * iva_constant AS iva, 
        get_computed_value(operation.stock_price, operation.stock_amount) * register_constant AS register_value, 
	    get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 0) AS net_sell,
        exchange_rate.value AS exchange_rate, 
	    get_computed_value(operation.stock_price, operation.stock_amount) / exchange_rate.value AS raw_dollar_sell, 
		get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 0) / exchange_rate.value AS dolar_net_sell
        FROM Operation, Price_RV, Stock_Exchange_Title, Exchange_Rate, Operation_Type
        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = Operation_Type.id 
		AND Operation_Type.name = 'Venta' AND Price_RV.title_id = Stock_Exchange_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id;

END; 
$$ LANGUAGE plpgsql;

/* Get buy operations for user */
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
DECLARE
    comission_constant NUMERIC;
    iva_constant NUMERIC;
    register_constant NUMERIC;
BEGIN
    comission_constant := get_last_value_constant('Comisión');
    iva_constant := get_last_value_constant('IVA');
    register_constant := get_last_value_constant('Registro');

    RETURN QUERY
        SELECT operation.id, operation.created_at, stock_exchange_title.value, operation.stock_amount,
        operation.stock_price, get_computed_value(operation.stock_price, operation.stock_amount) AS buy_value, 
        get_computed_value(operation.stock_price, operation.stock_amount) * comission_constant AS comission, 
	    get_computed_value(operation.stock_price, operation.stock_amount) * comission_constant * iva_constant AS iva, 
        get_computed_value(operation.stock_price, operation.stock_amount) * register_constant AS register_value,

	    get_total_computed_value(operation.stock_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 1) AS total_cost,

        get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / operation.stock_amount AS unit_total_price,

        exchange_rate.value AS exchange_rate, 
	    
        get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value AS dollar_total_cost,

        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value) / operation.stock_amount AS dollar_unit_total_price,

        price_rv.close_price AS market_price,
        (price_rv.close_price - operation.stock_price) / operation.stock_price AS variation,
        get_computed_value(price_rv.close_price, operation.stock_amount) AS market_value,

        get_computed_value(price_rv.close_price, operation.stock_amount) * comission_constant AS comission_percentage,
        
        get_computed_value(price_rv.close_price, operation.stock_amount) * comission_constant * iva_constant AS iva_percentage,

        get_computed_value(price_rv.close_price, operation.stock_amount) * register_constant AS register_percentage,

        get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) AS total_income,

        get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 1) AS gp_value,

        ((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 1)) / 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 1)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at))) AS performance_value,


        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Exchange_Title.id, Operation_Type.id) AS weight_in_wallet,

        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Exchange_Title.id, Operation_Type.id) *
        (((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) - 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 1)) / 
        get_total_computed_value(operation.stock_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 1)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at)))) AS weighted_performance,

        (get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) / 
        get_latest_exchange_rate()) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value) AS dollar_gp,

        (((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) / 
        get_latest_exchange_rate()) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value)) / 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at))) AS dollar_performance_value,

        ((((get_total_computed_value(price_rv.close_price, operation.stock_amount, comission_constant, iva_constant, register_constant, 0) / 
        get_latest_exchange_rate()) - 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value)) / 
        (get_total_computed_value(operation.stock_price, operation.stock_amount, 
        comission_constant, iva_constant, register_constant, 1) / exchange_rate.value)) *
        (360::NUMERIC / (CURRENT_DATE - DATE(operation.created_at)))) * 
        operation.stock_amount / get_operations_stock_ammount_by_title(Stock_Exchange_Title.id, Operation_Type.id) AS dollar_weighted_performance

        FROM Operation, Price_RV, Stock_Exchange_Title, Exchange_Rate, Operation_Type
        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = Operation_Type.id 
		AND Operation_Type.name = 'Compra' AND Price_RV.title_id = Stock_Exchange_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id;

END; 
$$ LANGUAGE plpgsql;