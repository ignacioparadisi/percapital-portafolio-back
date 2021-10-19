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

CREATE OR REPLACE FUNCTION get_price_rvs(page_limit INTEGER, page_offset INTEGER)
    RETURNS TABLE(
        pr_count BIGINT,
        pr_id INTEGER,
        pr_title_id BIGINT,
        pr_exchange_rate_id BIGINT,
        pr_bolivares_price NUMERIC,
        pr_close_price NUMERIC,
        pr_created_at TIMESTAMP,
        pr_close_date TIMESTAMP,
        pr_latest_exchange_rate NUMERIC
    )
AS $$
DECLARE
    total BIGINT;
    current_exchange_rate NUMERIC;
BEGIN

    SELECT COUNT(*) INTO total FROM Price_RV;
    SELECT * INTO current_exchange_rate FROM get_latest_exchange_rate_value();
    RETURN QUERY SELECT total, id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date, current_exchange_rate FROM Price_RV LIMIT page_limit OFFSET page_offset;
END;
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

CREATE OR REPLACE FUNCTION create_price_rv(prv_title_id INTEGER, prv_exchange_rate_id INTEGER, prv_bolivares_price NUMERIC, prv_created_at TIMESTAMP, 
    prv_close_date TIMESTAMP, prv_close_price NUMERIC)
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
    IF prv_created_at IS NULL THEN
        RETURN QUERY INSERT INTO Price_RV(title_id, exchange_rate_id, bolivares_price, close_date, close_price) 
            VALUES (prv_title_id, prv_exchange_rate_id, prv_bolivares_price, prv_close_date, prv_close_price)
            RETURNING id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date;
    ELSE

    RETURN QUERY INSERT INTO Price_RV(title_id, exchange_rate_id, bolivares_price, close_date, close_price, created_at) 
            VALUES (prv_title_id, prv_exchange_rate_id, prv_bolivares_price, prv_close_date, prv_close_price, prv_created_at)
            RETURNING id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date;
    
    END IF;
END;
$$ LANGUAGE plpgsql;
