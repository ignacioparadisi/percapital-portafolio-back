CREATE OR REPLACE FUNCTION get_exchange_rates(page_limit INTEGER, page_offset INTEGER)
    RETURNS TABLE(
        er_count BIGINT,
        er_id INTEGER,
        er_value NUMERIC,
        er_created_at TIMESTAMP
    )
AS $$
DECLARE
    total BIGINT;
BEGIN
    SELECT COUNT(*) INTO total FROM Exchange_Rate;
    IF page_limit IS NULL THEN
        RETURN QUERY SELECT total, * FROM Exchange_Rate ORDER BY created_at DESC;
    ELSIF page_offset IS NULL THEN
        RETURN QUERY SELECT total, * FROM Exchange_Rate ORDER BY created_at DESC LIMIT page_limit;
    ELSE
        RETURN QUERY SELECT total, * FROM Exchange_Rate ORDER BY created_at DESC LIMIT page_limit OFFSET page_offset;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_exchange_rate_by_id(exc_id INTEGER) 
    RETURNS TABLE(
        er_id INTEGER,
        er_value NUMERIC,
        er_created_at TIMESTAMP
    )
AS $$
BEGIN 
    RETURN QUERY SELECT * FROM Exchange_Rate WHERE id = exc_id;
END;
$$ LANGUAGE plpgsql;

-- Get the lastest exchange rate value.
CREATE OR REPLACE FUNCTION get_latest_exchange_rate_value()
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

-- Get the lastest exchange rate.
CREATE OR REPLACE FUNCTION get_latest_exchange_rate()
    RETURNS TABLE(
        er_id INTEGER,
        er_value NUMERIC,
        er_created_at TIMESTAMP
    )
AS
$$
BEGIN
    RETURN QUERY SELECT * FROM Exchange_Rate ORDER BY Exchange_Rate.id DESC LIMIT 1;
END; 
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

-- Create a Exchange Rate
CREATE OR REPLACE FUNCTION create_exchange_rate(exchange_value NUMERIC)
    RETURNS TABLE(
        er_id INTEGER,
        er_value NUMERIC,
        er_created_at TIMESTAMP
    )
AS $$
BEGIN
    RETURN QUERY INSERT INTO Exchange_Rate(value) VALUES (exchange_value) 
        RETURNING id, value, created_at;
END;
$$ LANGUAGE plpgsql;