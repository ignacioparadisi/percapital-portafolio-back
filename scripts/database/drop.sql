DROP TABLE IF EXISTS Operation;
DROP TABLE IF EXISTS Percapital_User;
DROP TABLE IF EXISTS Operation_Type;
DROP TABLE IF EXISTS Price_RV;
DROP TABLE IF EXISTS Stock_Exchange_Title;
DROP TABLE IF EXISTS Exchange_Rate;
DROP TABLE IF EXISTS Constant_Value;
DROP TABLE IF EXISTS Constant_Type;
DROP TABLE IF EXISTS Role;

DROP FUNCTION get_constant_types(integer);
DROP FUNCTION get_constant_values(integer);
DROP FUNCTION get_last_value_constant(integer);
DROP FUNCTION get_computed_value(NUMERIC, NUMERIC);
DROP DROP get_operations_stock_ammount_by_title(integer,integer);
DROP FUNCTION get_sell_operations(integer);
DROP FUNCTION get_buy_operations(integer);