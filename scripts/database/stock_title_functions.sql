CREATE OR REPLACE FUNCTION get_stock_titles(page_limit INTEGER, page_offset INTEGER, search TEXT)
    RETURNS TABLE(
        st_count BIGINT,
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_isin_code VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
DECLARE
    total BIGINT;
BEGIN

    IF search IS NOT NULL AND search <> '' THEN
        SELECT COUNT(*) INTO total FROM Stock_Title WHERE LOWER(symbol) LIKE CONCAT(LOWER(search), '%') OR LOWER(name) LIKE CONCAT(LOWER(search), '%');
    ELSE
        SELECT COUNT(*) INTO total FROM Stock_Title;
    END IF;

    IF search IS NOT NULL AND search <> '' THEN
        RETURN QUERY SELECT total, * FROM Stock_Title WHERE LOWER(symbol) LIKE CONCAT(LOWER(search), '%') OR LOWER(name) LIKE CONCAT(LOWER(search), '%') ORDER BY symbol LIMIT page_limit OFFSET page_offset;
    ELSE
        RETURN QUERY SELECT total, * FROM Stock_Title ORDER BY symbol LIMIT page_limit OFFSET page_offset;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_stock_title_by_id(titl_id INTEGER) 
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_isin_code VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN 
    RETURN QUERY SELECT * FROM Stock_Title WHERE id = titl_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_stock_title_with_stocks(percapital_user_id INTEGER)
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_isin_code VARCHAR,
        st_stock_amount NUMERIC
    )
AS $$
BEGIN 
    RETURN QUERY SELECT stock_title.id, Stock_Title.name, Stock_Title.symbol, Stock_Title.isin_code, stocks_in_portfolio_by_user_and_title(percapital_user_id, Stock_Title.id)
        FROM Stock_Title;
END;
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

-- Create a Title
CREATE OR REPLACE FUNCTION create_stock_title(title_name TEXT, title_symbol VARCHAR, title_isin_code VARCHAR)
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_isin_code VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN
    RETURN QUERY INSERT INTO Stock_Title(name, symbol, isin_code) 
        VALUES (title_name, title_symbol, title_isin_code)
        RETURNING id, name, symbol, isin_code, created_at;
END;
$$ LANGUAGE plpgsql;
