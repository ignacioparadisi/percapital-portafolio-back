DROP TABLE IF EXISTS Operation;
DROP TABLE IF EXISTS Percapital_User;
DROP TABLE IF EXISTS Operation_Type;
DROP TABLE IF EXISTS Price_RV;
DROP TABLE IF EXISTS Stock_Title;
DROP TABLE IF EXISTS Exchange_Rate;
DROP TABLE IF EXISTS Constant_Value;
DROP TABLE IF EXISTS Constant_Type;
DROP TABLE IF EXISTS Percapital_Role;

DROP FUNCTION IF EXISTS login(VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS get_users(INTEGER);
DROP FUNCTION IF EXISTS get_roles(INTEGER);
DROP FUNCTION IF EXISTS get_constant_types(INTEGER);
DROP FUNCTION IF EXISTS get_constant_values(INTEGER);
DROP FUNCTION IF EXISTS get_last_value_constant(INTEGER);
DROP FUNCTION IF EXISTS get_computed_value(NUMERIC, NUMERIC);
DROP FUNCTION IF EXISTS get_operations_stock_ammount_by_title(INTEGER,INTEGER);
DROP FUNCTION IF EXISTS get_latest_exchange_rate();
DROP FUNCTION IF EXISTS get_sell_operations(INTEGER, INTEGER, INTEGER);
DROP FUNCTION IF EXISTS get_buy_operations(INTEGER, INTEGER, INTEGER);
DROP FUNCTION IF EXISTS get_price_rv(INTEGER);
DROP FUNCTION IF EXISTS get_total_computed_value(NUMERIC, NUMERIC, NUMERIC, NUMERIC, NUMERIC, INTEGER);
DROP FUNCTION IF EXISTS get_stock_titles(INTEGER, INTEGER);
DROP FUNCTION IF EXISTS create_stock_title(TEXT, VARCHAR);
DROP FUNCTION IF EXISTS create_exchange_rate(NUMERIC);
DROP FUNCTION IF EXISTS get_exchange_rates(NUMERIC);
DROP FUNCTION IF EXISTS create_operation(INTEGER, INTEGER, NUMERIC, NUMERIC, INTEGER, INTEGER, INTEGER, INTEGER, TIMESTAMP);
DROP FUNCTION IF EXISTS get_price_rv_by_exchange_rate(NUMERIC);
DROP FUNCTION IF EXISTS get_price_rv_by_title(INTEGER);
DROP FUNCTION IF EXISTS create_price_rv(INTEGER, INTEGER, NUMERIC, TIMESTAMP, TIMESTAMP, NUMERIC);
DROP FUNCTION IF EXISTS get_operation_type(INTEGER);
DROP FUNCTION IF EXISTS get_price_rvs(INTEGER, INTEGER);