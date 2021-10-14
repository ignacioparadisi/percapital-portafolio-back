CREATE OR REPLACE FUNCTION get_stock_titles(page_limit INTEGER, page_offset INTEGER)
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN
    IF page_limit IS NULL THEN
        RETURN QUERY SELECT * FROM Stock_Title;
    ELSIF page_offset IS NULL THEN
        RETURN QUERY SELECT * FROM Stock_Title LIMIT page_limit;
    ELSE
        RETURN QUERY SELECT * FROM Stock_Title LIMIT page_limit OFFSET page_offset;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_stock_title_by_id(titl_id INTEGER) 
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN 
    RETURN QUERY SELECT * FROM Stock_Title WHERE id = titl_id;
END;
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

-- Create a Title
CREATE OR REPLACE FUNCTION create_stock_title(title_name TEXT, title_symbol VARCHAR)
    RETURNS TABLE(
        st_id INTEGER,
        st_name TEXT,
        st_symbol VARCHAR,
        st_created_at TIMESTAMP
    )
AS $$
BEGIN
    RETURN QUERY INSERT INTO Stock_Title(name, symbol) VALUES (title_name, title_symbol) 
        RETURNING id, name, symbol, created_at;
END;
$$ LANGUAGE plpgsql;