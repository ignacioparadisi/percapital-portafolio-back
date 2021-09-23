-- OPERATION TYPE
INSERT INTO Operation_Type(name) VALUES 
    ('Compra'), 
    ('Venta');

-- CONSTANT TYPE
INSERT INTO Constant_Type(name) VALUES 
    ('IVA'), 
    ('Comisión'), 
    ('Registro');

-- ROLE
INSERT INTO Role(value) VALUES 
    ('Usuario'), 
    ('Admin');

-- EXCHANGE RATE
INSERT INTO Exchange_Rate(value) VALUES 
    (730.29);

-- EXCHANGE RATE
INSERT INTO Stock_Exchange_Title(description, value) VALUES 
    ('B.CARIBE "A"', 'ABC.A');

-- CONSTANT VALUE
INSERT INTO Constant_Value(constant_type_id, value) VALUES
    (1, 0.16), -- IVA
    (2, 0.04), -- Comisión
    (3, 0.001); -- Registro

INSERT INTO Percapital_User(role_id, first_name, last_name, email, phone_number) VALUES
    (2, 'Angel', 'Rivero', 'angelantonio3000@gmail.com', '+525618703049'),
    (2, 'Ignacio', 'Paradisi', 'ignaciotfw@gmail.com', '+525618703049');

-- PRICE RV
INSERT INTO Price_RV(title_id, exchange_rate_id, bolivares_price, close_date, close_price) VALUES 
    (1, 1, 390, '2021-09-19', 27499);

-- OPERATION
INSERT INTO Operation(price_rv_id, user_id, stock_amount, stock_price, type_id) VALUES 
    (1, 1, 89, 2800, 1),
    (1, 1, 89, 2800, 2);
