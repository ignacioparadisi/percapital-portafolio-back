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

CREATE OR REPLACE FUNCTION get_price_rvs(filter_date DATE, filter_title_id INTEGER, page_limit INTEGER, page_offset INTEGER)
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

    IF filter_date IS NULL AND filter_title_id IS NULL THEN
        SELECT COUNT(*) INTO total FROM Price_RV;
    ELSEIF filter_date IS NULL AND filter_title_id IS NOT NULL THEN
        SELECT COUNT(*) INTO total FROM Price_RV WHERE title_id = filter_title_id;
    ELSEIF filter_title_id IS NULL AND filter_date IS NOT NULL THEN
        SELECT COUNT(*) INTO total FROM Price_RV WHERE created_at::DATE = filter_date::DATE;
    ELSE 
        SELECT COUNT(*) INTO total FROM Price_RV WHERE created_at::DATE = filter_date::DATE AND title_id = filter_title_id;
    END IF;
    SELECT * INTO current_exchange_rate FROM get_latest_exchange_rate_value();
    
    IF filter_date IS NULL AND filter_title_id IS NULL THEN 
        RETURN QUERY SELECT total, id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date, current_exchange_rate 
        FROM Price_RV LIMIT page_limit OFFSET page_offset;
    ELSIF filter_date IS NULL AND filter_title_id IS NOT NULL THEN 
        RETURN QUERY SELECT total, id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date, current_exchange_rate 
        FROM Price_RV WHERE title_id = filter_title_id LIMIT page_limit OFFSET page_offset;
    ELSIF filter_date IS NOT NULL AND filter_title_id IS NULL THEN 
        RETURN QUERY SELECT total, id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date, current_exchange_rate 
        FROM Price_RV WHERE created_at::DATE = filter_date::DATE LIMIT page_limit OFFSET page_offset; 
    ELSIF filter_date IS NOT NULL AND filter_title_id IS NOT NULL THEN 
        RETURN QUERY SELECT total, id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date, current_exchange_rate 
        FROM Price_RV WHERE created_at::DATE = filter_date::DATE AND title_id = filter_title_id LIMIT page_limit OFFSET page_offset; 
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION latest_price_rv_by_title(selected_title_id BIGINT)
    RETURNS NUMERIC
AS $$
DECLARE
    price_rv_id BIGINT;
    return_value NUMERIC;
BEGIN
    SELECT price_rv.id, price_rv.close_price INTO price_rv_id, return_value
    FROM Price_RV WHERE price_rv.title_id = selected_title_id ORDER BY Price_RV.id DESC LIMIT 1;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_latest_price_rvs(page_limit INTEGER, page_offset INTEGER)
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
    SELECT * INTO current_exchange_rate FROM get_latest_exchange_rate_value();
    SELECT COUNT(*) INTO total FROM (SELECT DISTINCT ON (title_id) id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date
    FROM Price_RV ORDER BY title_id, Price_RV.created_at DESC) AS Filtered_Price_RV;

    RETURN QUERY SELECT DISTINCT ON (title_id) total, id, title_id, exchange_rate_id, bolivares_price, close_price, created_at, close_date, current_exchange_rate
    FROM Price_RV ORDER BY title_id, Price_RV.created_at DESC LIMIT page_limit OFFSET page_offset;
    
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_price_rv_id(pr_title_id BIGINT)
    RETURNS BIGINT
AS
$$
DECLARE
    return_value BIGINT;
BEGIN
    SELECT id FROM Price_RV INTO return_value WHERE title_id = pr_title_id
    ORDER BY id DESC LIMIT 1;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_price_rv_bs_price(pr_title_id BIGINT)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    SELECT bolivares_price FROM Price_RV INTO return_value WHERE title_id = pr_title_id
    ORDER BY id DESC LIMIT 1;

    RETURN return_value;
END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_price_rv_close_price(pr_title_id BIGINT)
    RETURNS NUMERIC
AS
$$
DECLARE
    return_value NUMERIC;
BEGIN
    SELECT close_price FROM Price_RV INTO return_value WHERE title_id = pr_title_id
    ORDER BY id DESC LIMIT 1;

    RETURN return_value;
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
