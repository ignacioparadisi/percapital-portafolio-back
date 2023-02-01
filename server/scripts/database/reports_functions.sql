CREATE OR REPLACE FUNCTION get_latest_stock_price_by_title(stock_title_id NUMERIC, offset_value INTEGER)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    SELECT close_price INTO return_value FROM Price_RV WHERE title_id = stock_title_id ORDER BY close_date DESC LIMIT 1 OFFSET offset_value;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_stock_change_by_title(stock_title_id NUMERIC)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    
    SELECT COALESCE((Last_Price_Query.* - Previous_Price_Query.*) / Previous_Price_Query.*, 0) INTO return_value
    FROM get_latest_stock_price_by_title(stock_title_id, 0) AS Last_Price_Query,
    get_latest_stock_price_by_title(stock_title_id, 1) AS Previous_Price_Query;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_buy_speculate_by_title(stock_title_id NUMERIC)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    
    Select COALESCE((Last_Price_Query.stock_price - Previous_Price_Query.stock_price) / Previous_Price_Query.stock_price, 0) INTO return_value
    FROM (SELECT * FROM Operation WHERE title_id = stock_title_id AND type_id = 1 ORDER BY created_at DESC LIMIT 1) AS Last_Price_Query,
    (SELECT * FROM Operation WHERE title_id = stock_title_id AND type_id = 1 ORDER BY created_at DESC LIMIT 1 OFFSET 1) AS Previous_Price_Query;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_sell_speculate_by_title(stock_title_id NUMERIC)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    
    Select COALESCE((Last_Price_Query.stock_price - Previous_Price_Query.stock_price) / Previous_Price_Query.stock_price, 0) INTO return_value
    FROM (SELECT * FROM Operation WHERE title_id = stock_title_id AND type_id = 2 ORDER BY created_at DESC LIMIT 1) AS Last_Price_Query,
    (SELECT * FROM Operation WHERE title_id = stock_title_id AND type_id = 2 ORDER BY created_at DESC LIMIT 1 OFFSET 1) AS Previous_Price_Query;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_reports()
    RETURNS TABLE (
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_isin_code VARCHAR,
        st_created_at TIMESTAMP,
    
        st_change NUMERIC,
        st_latest_price NUMERIC,
        st_buy_speculate NUMERIC,
        st_sell_speculate NUMERIC,
        market_performance NUMERIC
    )
AS
$$
DECLARE
    found_title_id INTEGER;
    performance_value NUMERIC;
BEGIN
    
    SELECT id INTO found_title_id FROM Stock_Title WHERE symbol = 'BVCC' LIMIT 1;

    SELECT (SUM(((get_total_computed_value(get_price_rv_close_price(operation.title_id), operation.stock_amount, comission.value, iva.value, register.value, operation.other_comission, 0) -
            get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, operation.other_comission, 1)) /
            get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, operation.other_comission, 1)) *
           (360::NUMERIC / NULLIF((CURRENT_DATE - DATE(operation.created_at)), 0))) / (SELECT COUNT(*) FROM Operation WHERE operation.title_id = found_title_id AND operation.type_id = 1)) 
           INTO performance_value
    FROM Operation, Constant_Value AS Register, Constant_Value AS IVA, Constant_Value AS Comission
    WHERE Operation.title_id = found_title_id
      AND Operation.type_id = 1 -- Compra
      AND Register.id = Operation.register_cv_id AND IVA.id = Operation.iva_cv_id AND Comission.id = Operation.comission_cv_id;

    RETURN QUERY SELECT Stock_Title.*, get_stock_change_by_title(Stock_Title.id), get_latest_stock_price_by_title(Stock_Title.id, 0),
	    get_buy_speculate_by_title(Stock_Title.id), get_sell_speculate_by_title(Stock_Title.id), performance_value FROM Stock_Title;
END; 
$$ LANGUAGE plpgsql;