-- Get Price RV by id
-- params:
---- `price_rv_id`: The ID of the operation
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

CREATE OR REPLACE FUNCTION get_price_rv_by_exchange_rate(ex_rate_id INTEGER) 
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
    RETURN QUERY SELECT id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date FROM Price_RV WHERE exchange_rate_id = ex_rate_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_price_rv_by_title(titl_id INTEGER) 
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
    RETURN QUERY SELECT id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date FROM Price_RV WHERE title_id = titl_id;
END;
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

