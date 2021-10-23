CREATE OR REPLACE FUNCTION stocks_in_portfolio_by_user_and_title(percapital_user_id BIGINT, selected_title_id BIGINT)
    RETURNS NUMERIC
AS $$
DECLARE
    return_value NUMERIC;
BEGIN
    SELECT Buy_Operation.amount - Sell_Operation.amount INTO return_value FROM
    (SELECT SUM(Operation.stock_amount) AS amount FROM Operation, Price_RV 
    WHERE Operation.user_id = percapital_user_id AND Operation.price_rv_id = Price_RV.id 
    AND Price_RV.title_id = selected_title_id AND Operation.type_id = 1) AS Buy_Operation,
    (SELECT SUM(Operation.stock_amount) AS amount FROM Operation, Price_RV 
    WHERE Operation.user_id = percapital_user_id AND Operation.price_rv_id = Price_RV.id 
    AND Price_RV.title_id = selected_title_id AND Operation.type_id = 2) AS Sell_Operation;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION portfolio_values(percapital_user_id BIGINT)
    RETURNS TABLE (
        port_title_symbol VARCHAR,
        port_title_desc VARCHAR,
        port_stock_price VARCHAR,
        port_stocks_in_folio NUMERIC,
        port_avg_buy_price NUMERIC,
        port_buy_total_cost NUMERIC,
        port_dollar_buy_total_cost NUMERIC,
        port_market_net_value NUMERIC,
        port_dollar_market_net_value NUMERIC,
        port_net_gp NUMERIC,
        port_dollar_net_gp NUMERIC,
        port_variation NUMERIC,
        port_dollar_variation NUMERIC,
        port_percentage_in_folio NUMERIC
    )
AS $$
BEGIN
    RETURN QUERY SELECT 
        FROM Operation, Price_RV, Stock_Title, Exchange_Rate, Operation_Type
END;
$$ LANGUAGE plpgsql;