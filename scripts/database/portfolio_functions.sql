CREATE OR REPLACE FUNCTION stocks_in_portfolio_by_user_and_title(percapital_user_id BIGINT, selected_title_id BIGINT)
    RETURNS NUMERIC
AS $$
DECLARE
    buy_stocks_amount NUMERIC;
    sell_stocks_amount NUMERIC;
    return_value NUMERIC;
BEGIN
    SELECT Buy_Operation.amount, Sell_Operation.amount INTO buy_stocks_amount, sell_stocks_amount FROM
    (SELECT SUM(Operation.stock_amount) AS amount FROM Operation 
    WHERE Operation.user_id = percapital_user_id AND Operation.title_id = selected_title_id AND Operation.type_id = 1) AS Buy_Operation,
    (SELECT SUM(Operation.stock_amount) AS amount FROM Operation 
    WHERE Operation.user_id = percapital_user_id AND Operation.title_id = selected_title_id AND Operation.type_id = 2) AS Sell_Operation;

    IF buy_stocks_amount IS NOT NULL OR sell_stocks_amount IS NOT NULL THEN 
        return_value = COALESCE(buy_stocks_amount,0) - COALESCE(sell_stocks_amount,0);
    END IF;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION portfolio_buy_total_cost(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    sell_total_stocks_amount NUMERIC;
    buy_total_stocks_amount NUMERIC;
    buy_total_cost NUMERIC;
    return_value NUMERIC;
BEGIN
    
    SELECT SUM(op_stock_amount), SUM(op_total_cost) INTO buy_total_stocks_amount, buy_total_cost 
    FROM get_buy_operations(percapital_user_id, null, null) WHERE op_title_id = selected_title_id;

    SELECT SUM(op_stock_amount) INTO sell_total_stocks_amount FROM get_sell_operations(percapital_user_id, null, null) 
    WHERE op_title_id = selected_title_id;

    IF sell_total_stocks_amount <> 0 THEN 
        return_value = buy_total_cost - (buy_total_cost / (buy_total_stocks_amount * sell_total_stocks_amount));
    ELSE
        return_value = buy_total_cost;
    END IF;
    
    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_dollar_buy_total_cost(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    sell_total_stocks_amount NUMERIC;
    buy_total_stocks_amount NUMERIC;
    buy_total_cost NUMERIC;
    return_value NUMERIC;
BEGIN
    
    SELECT SUM(op_stock_amount), SUM(op_dollar_total_cost) INTO buy_total_stocks_amount, buy_total_cost 
    FROM get_buy_operations(percapital_user_id, null, null) WHERE op_title_id = selected_title_id;

    SELECT SUM(op_stock_amount) INTO sell_total_stocks_amount FROM get_sell_operations(percapital_user_id, null, null) 
    WHERE op_title_id = selected_title_id;

    IF sell_total_stocks_amount <> 0 THEN 
        return_value = buy_total_cost - (buy_total_cost / (buy_total_stocks_amount * sell_total_stocks_amount));
    ELSE
        return_value = buy_total_cost;
    END IF;
    
    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_buy_avg_price(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    stocks_amount NUMERIC;
    buy_cost NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO stocks_amount FROM 
    stocks_in_portfolio_by_user_and_title(percapital_user_id::BIGINT, selected_title_id::BIGINT);


    IF stocks_amount = 0 THEN 
        return_value = 0;
    ELSE
        SELECT * INTO buy_cost FROM portfolio_buy_total_cost(percapital_user_id, selected_title_id);
        return_value = buy_cost / stocks_amount;
    END IF;
    
    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_net_market_value(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    stocks_amount_in_portfolio NUMERIC;
    stock_price NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO stock_price FROM 
    latest_price_rv_by_title(selected_title_id);

    SELECT * INTO stocks_amount_in_portfolio FROM 
    stocks_in_portfolio_by_user_and_title(percapital_user_id, selected_title_id);
    
    return_value = stocks_amount_in_portfolio * stock_price;
    -- TODO: Cambiar valores estaticos a los de la tabla
    RETURN return_value - (return_value * (0.04+(0.04*0.16))) - return_value * 0.001;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_dollar_net_market_value(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    stocks_amount_in_portfolio NUMERIC;
    stock_price NUMERIC;
    latest_exchange_rate_value NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO stock_price FROM 
    latest_price_rv_by_title(selected_title_id);

    SELECT * INTO stocks_amount_in_portfolio FROM 
    stocks_in_portfolio_by_user_and_title(percapital_user_id, selected_title_id);

    SELECT * INTO latest_exchange_rate_value FROM
    get_latest_exchange_rate_value();
    
    return_value = (stocks_amount_in_portfolio * stock_price) / latest_exchange_rate_value;

    RETURN return_value - (return_value * (0.04+(0.04*0.16))) - return_value * 0.001;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_dollar_raw_value(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    stocks_amount_in_portfolio NUMERIC;
    stock_price NUMERIC;
    latest_exchange_rate_value NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO stock_price FROM 
    latest_price_rv_by_title(selected_title_id);

    SELECT * INTO stocks_amount_in_portfolio FROM 
    stocks_in_portfolio_by_user_and_title(percapital_user_id, selected_title_id);

    SELECT * INTO latest_exchange_rate_value FROM
    get_latest_exchange_rate_value();
    
    return_value = (stocks_amount_in_portfolio * stock_price) / latest_exchange_rate_value;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_raw_sells(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    return_value NUMERIC;
BEGIN

    SELECT SUM(op_value) INTO return_value FROM get_sell_operations(percapital_user_id, null, null) 
    WHERE op_title_id = selected_title_id;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_dollar_raw_sells(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    return_value NUMERIC;
BEGIN

    SELECT SUM(op_raw_dollar_value) INTO return_value FROM get_sell_operations(percapital_user_id, null, null) 
    WHERE op_title_id = selected_title_id;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_variation(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    stocks_amount NUMERIC;
    net_market_value NUMERIC;
    buy_total_cost NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO stocks_amount FROM 
    stocks_in_portfolio_by_user_and_title(percapital_user_id::BIGINT, selected_title_id::BIGINT);


    IF stocks_amount = 0 THEN 
        return_value = 0;
    ELSE
        SELECT * INTO buy_total_cost FROM portfolio_buy_total_cost(percapital_user_id, selected_title_id);
        SELECT * INTO net_market_value FROM portfolio_net_market_value(percapital_user_id, selected_title_id);
        return_value = (net_market_value - buy_total_cost) / buy_total_cost;
    END IF;
    
    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_dollar_variation(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    stocks_amount NUMERIC;
    net_market_value NUMERIC;
    buy_total_cost NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO stocks_amount FROM 
    stocks_in_portfolio_by_user_and_title(percapital_user_id::BIGINT, selected_title_id::BIGINT);


    IF stocks_amount = 0 THEN 
        return_value = 0;
    ELSE
        SELECT * INTO buy_total_cost FROM portfolio_dollar_buy_total_cost(percapital_user_id, selected_title_id);
        SELECT * INTO net_market_value FROM portfolio_dollar_net_market_value(percapital_user_id, selected_title_id);
        return_value = (net_market_value - buy_total_cost) / buy_total_cost;
    END IF;
    
    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_percentage_in_folio(percapital_user_id INTEGER, selected_title_id INTEGER)
    RETURNS NUMERIC
AS $$
DECLARE
    title_net_market_value NUMERIC;
    total_net_market_value NUMERIC;
    return_value NUMERIC;
BEGIN

    SELECT * INTO title_net_market_value FROM 
    portfolio_net_market_value(percapital_user_id, selected_title_id);

    SELECT SUM(Sub_Query.net_market_value) INTO total_net_market_value FROM
    (SELECT portfolio_net_market_value(percapital_user_id, Stock_Title.id) AS net_market_value
        FROM Operation, Stock_Title
        WHERE Operation.title_id = Stock_Title.id AND Operation.user_id = percapital_user_id
	    GROUP BY Stock_Title.id) AS Sub_Query;


    IF title_net_market_value / total_net_market_value = 0 THEN 
        return_value = 0;
    ELSE
        return_value = (title_net_market_value / total_net_market_value) * 100;
    END IF;
    
    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION portfolio_values(percapital_user_id INTEGER)
    RETURNS TABLE (
        port_title_id INTEGER,
        port_title_symbol VARCHAR,
        port_title_desc TEXT,
        port_stock_price NUMERIC,
        port_stocks_in_folio NUMERIC,
        port_avg_buy_price NUMERIC,
        port_buy_total_cost NUMERIC,
        port_dollar_buy_total_cost NUMERIC,
        port_market_net_value NUMERIC,
        port_dollar_market_net_value NUMERIC,
        port_raw_value NUMERIC,
        port_dollar_raw_value NUMERIC,
        port_raw_sells NUMERIC,
        port_dollar_raw_sells NUMERIC,
        port_net_gp NUMERIC,
        port_dollar_net_gp NUMERIC,
        port_variation NUMERIC,
        port_dollar_variation NUMERIC,
        port_percentage_in_folio NUMERIC --19
    )
AS $$
BEGIN
    RETURN QUERY SELECT Stock_Title.id, Stock_Title.symbol, Stock_Title.name, 
        latest_price_rv_by_title(Stock_Title.id), stocks_in_portfolio_by_user_and_title(percapital_user_id, Stock_Title.id),
        portfolio_buy_avg_price(percapital_user_id, Stock_Title.id), portfolio_buy_total_cost(percapital_user_id, Stock_Title.id), 
        portfolio_dollar_buy_total_cost(percapital_user_id, Stock_Title.id), portfolio_net_market_value(percapital_user_id, Stock_Title.id),
        portfolio_dollar_net_market_value(percapital_user_id, Stock_Title.id),
        latest_price_rv_by_title(Stock_Title.id) * stocks_in_portfolio_by_user_and_title(percapital_user_id, Stock_Title.id) AS port_raw_value,
        portfolio_dollar_raw_value(percapital_user_id, Stock_Title.id), portfolio_raw_sells(percapital_user_id, Stock_Title.id),
        portfolio_dollar_raw_sells(percapital_user_id, Stock_Title.id),
        portfolio_net_market_value(percapital_user_id, Stock_Title.id) - portfolio_buy_total_cost(percapital_user_id, Stock_Title.id) AS net_gp,
        portfolio_dollar_net_market_value(percapital_user_id, Stock_Title.id) - portfolio_dollar_buy_total_cost(percapital_user_id, Stock_Title.id) AS dollar_net_gp,
        portfolio_variation(percapital_user_id, Stock_Title.id), portfolio_dollar_variation(percapital_user_id, Stock_Title.id),
        portfolio_percentage_in_folio(percapital_user_id, Stock_Title.id)

        FROM Operation, Stock_Title
        WHERE Operation.title_id = Stock_Title.id AND Operation.user_id = percapital_user_id
        GROUP BY Stock_Title.id;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_portfolio(percapital_user_id INTEGER)
    RETURNS TABLE (
        port_count BIGINT,
        port_performance_value NUMERIC,
        port_total_stocks_amount NUMERIC,
        port_total_buy_total_cost NUMERIC,
        port_total_dollar_buy_total_cost NUMERIC,
        port_total_net_market_value NUMERIC,
        port_total_dollar_net_market_value NUMERIC,
        port_total_raw_value NUMERIC,
        port_total_dollar_raw_value NUMERIC,
        port_total_net_gp NUMERIC,
        port_total_dollar_net_gp NUMERIC,

        port_title_id INTEGER,
        port_title_symbol VARCHAR,
        port_title_desc TEXT,
        port_stock_price NUMERIC,
        port_stocks_in_folio NUMERIC,
        port_avg_buy_price NUMERIC,
        port_buy_total_cost NUMERIC,
        port_dollar_buy_total_cost NUMERIC,
        port_market_net_value NUMERIC,
        port_dollar_market_net_value NUMERIC,
        port_raw_value NUMERIC,
        port_dollar_raw_value NUMERIC,
        port_raw_sells NUMERIC,
        port_dollar_raw_sells NUMERIC,
        port_net_gp NUMERIC,
        port_dollar_net_gp NUMERIC,
        port_variation NUMERIC,
        port_dollar_variation NUMERIC,
        port_percentage_in_folio NUMERIC
    )
AS $$
DECLARE
    total BIGINT;
    port_total_stocks_amount NUMERIC;
    port_total_buy_total_cost NUMERIC;
    port_total_dollar_buy_total_cost NUMERIC;
    port_total_net_market_value NUMERIC;
    port_total_dollar_net_market_value NUMERIC;
    port_total_raw_value NUMERIC;
    port_total_dollar_raw_value NUMERIC;
    port_total_net_gp NUMERIC;
    port_total_dollar_net_gp NUMERIC;
    performance_value NUMERIC;
BEGIN
    SELECT COUNT(*), SUM(Portfolio_Values.port_stocks_in_folio), SUM(Portfolio_Values.port_buy_total_cost), SUM(Portfolio_Values.port_dollar_buy_total_cost), 
    SUM(Portfolio_Values.port_market_net_value), SUM(Portfolio_Values.port_dollar_market_net_value), SUM(Portfolio_Values.port_raw_value), 
    SUM(Portfolio_Values.port_dollar_raw_value), SUM(Portfolio_Values.port_net_gp), SUM(Portfolio_Values.port_dollar_net_gp)
    INTO total, port_total_stocks_amount, port_total_buy_total_cost, port_total_dollar_buy_total_cost, port_total_net_market_value, port_total_dollar_net_market_value,
    port_total_raw_value, port_total_dollar_raw_value, port_total_net_gp, port_total_dollar_net_gp
    FROM portfolio_values(percapital_user_id) AS Portfolio_Values;

    SELECT (SUM(((get_total_computed_value(get_price_rv_close_price(operation.title_id), operation.stock_amount, comission.value, iva.value, register.value, operation.other_comission, 0) -
             get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, operation.other_comission, 1)) /
            get_total_computed_value(operation.stock_price, operation.stock_amount, comission.value, iva.value, register.value, operation.other_comission, 1)) *
           (360::NUMERIC / NULLIF((CURRENT_DATE - DATE(operation.created_at)), 0))) / (SELECT COUNT(*) FROM Operation WHERE operation.user_id = percapital_user_id AND operation.type_id = 1)) INTO performance_value
    FROM Operation, Constant_Value AS Register, Constant_Value AS IVA, Constant_Value AS Comission
    WHERE Operation.user_id = percapital_user_id
      AND Operation.type_id = 1 -- Compra
      AND Register.id = Operation.register_cv_id AND IVA.id = Operation.iva_cv_id AND Comission.id = Operation.comission_cv_id;

    RETURN QUERY SELECT total, performance_value * 100, port_total_stocks_amount, port_total_buy_total_cost, port_total_dollar_buy_total_cost, port_total_net_market_value,
    port_total_dollar_net_market_value, port_total_raw_value, port_total_dollar_raw_value, port_total_net_gp, port_total_dollar_net_gp, Portfolio_Values.* 
    FROM portfolio_values(percapital_user_id) AS Portfolio_Values;

END;
$$ LANGUAGE plpgsql;