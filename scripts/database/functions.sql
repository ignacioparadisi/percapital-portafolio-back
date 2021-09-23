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

CREATE OR REPLACE FUNCTION get_sell_value(stock_price NUMERIC, stock_amount NUMERIC)
    RETURNS NUMERIC
AS
$$
BEGIN
    RETURN stock_price * stock_amount;
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
        WHERE Operation.price_rv_id = Price_RV.id AND Operation.user_id = p_user_id AND Operation.type_id = Operation_Type.id 
		AND Operation_Type.name = 'Venta' AND Price_RV.title_id = Stock_Exchange_Title.id AND Price_RV.exchange_rate_id = Exchange_Rate.id;

END; 
$$ LANGUAGE plpgsql;
