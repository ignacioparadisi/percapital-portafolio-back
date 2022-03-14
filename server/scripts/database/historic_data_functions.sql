CREATE OR REPLACE FUNCTION get_stock_historic_by_symbol(symbol_value TEXT, interval_value VARCHAR)
    RETURNS TABLE(
        sh_id INTEGER,
        sh_symbol TEXT,
        sh_stock_date TIMESTAMP,
        sh_close_price NUMERIC,
        sh_open_price NUMERIC,
        sh_high_price NUMERIC,
        sh_low_price NUMERIC,
        sh_volume TEXT,
        sh_change TEXT
    )
AS $$
BEGIN
    IF interval_value IS NULL OR interval_value = 'max' THEN
        RETURN QUERY SELECT * FROM Stock_Historic WHERE symbol = symbol_value ORDER BY stock_date ASC; 
    ELSE
        RETURN QUERY SELECT * FROM Stock_Historic 
        WHERE symbol = symbol_value AND stock_date >= (NOW() - interval_value::INTERVAL) ORDER BY stock_date ASC; 
    END IF;
END;
$$ LANGUAGE plpgsql;

/******************************
*******************************
            INSERTS
*******************************
*******************************/

CREATE OR REPLACE FUNCTION create_stock_historic(json_data TEXT, data_key VARCHAR, symbol_column_name VARCHAR,
                            date_column_name VARCHAR, close_column_name VARCHAR, open_column_name VARCHAR,
                            high_column_name VARCHAR, low_column_name VARCHAR, volume_column_name VARCHAR,
                            change_column_name VARCHAR)
    RETURNS TABLE(
        sh_id INTEGER,
        sh_symbol TEXT,
        sh_stock_date TIMESTAMP,
        sh_close_price NUMERIC,
        sh_open_price NUMERIC,
        sh_high_price NUMERIC,
        sh_low_price NUMERIC,
        sh_volume TEXT,
        sh_change TEXT
    )
AS $$
BEGIN
    DROP TABLE IF EXISTS json_table;
    CREATE TEMP TABLE json_table AS 
    SELECT json_row::json->>symbol_column_name AS insert_symbol, json_row::json->>date_column_name AS insert_stock_date, 
    json_row::json->>close_column_name AS insert_close_price,
    json_row::json->>open_column_name AS insert_open_price, json_row::json->>high_column_name AS insert_high_price,
    json_row::json->>low_column_name AS insert_low_price, json_row::json->>volume_column_name AS insert_volume,
    json_row::json->>change_column_name AS insert_change
    FROM (SELECT json_array_elements(json_data::json->data_key) AS json_row) AS Json_Data;

    RETURN QUERY INSERT INTO Stock_Historic(symbol, stock_date, close_price, 
                            open_price, high_price, low_price, volume, change)
        SELECT json_table.insert_symbol, TO_TIMESTAMP(json_table.insert_stock_date, 'YYYY-MM-DD'), json_table.insert_close_price::NUMERIC, 
        json_table.insert_open_price::NUMERIC, json_table.insert_high_price::NUMERIC, json_table.insert_low_price::NUMERIC, 
        json_table.insert_volume, json_table.insert_change
        FROM json_table
        ON CONFLICT (symbol, stock_date) 
        DO UPDATE SET close_price = EXCLUDED.close_price, open_price = EXCLUDED.open_price, high_price = EXCLUDED.high_price, 
        low_price = EXCLUDED.low_price, volume = EXCLUDED.volume, change = EXCLUDED.change
        RETURNING id, symbol, stock_date, close_price, open_price, high_price, low_price, volume, change;
END;
$$ LANGUAGE plpgsql;