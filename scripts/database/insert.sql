-- OPERATION TYPE
INSERT INTO Operation_Type(name) VALUES 
    ('Compra'), 
    ('Venta');

-- CONSTANT TYPE
INSERT INTO Constant_Type(name) VALUES 
    ('IVA'), 
    ('Comisión'), 
    ('Registro');

-- CONSTANT VALUE
INSERT INTO Constant_Value(constant_type_id, value) VALUES
    (1, 0.16), -- IVA
    (2, 0.04), -- Comisión
    (3, 0.001); -- Registro