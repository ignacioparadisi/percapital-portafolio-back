CREATE TABLE Constant_Type(
    id SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Constant_Value(
    id SERIAL PRIMARY KEY,
    constant_type_id BIGINT NOT NULL,
    value NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tva_cot_id FOREIGN KEY (constant_type_id) REFERENCES Constant_Type (id)
);

CREATE TABLE Exchange_Rate(
    id SERIAL PRIMARY KEY,
    value NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stock_Title(
    id SERIAL PRIMARY KEY,
    name TEXT,
    symbol VARCHAR(100) NOT NULL,
    isin_code  VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Percapital_Role(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Percapital_User(
    id SERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role_id FOREIGN KEY (role_id) REFERENCES Percapital_Role(id)
);

CREATE TABLE Price_RV(
    id SERIAL PRIMARY KEY,
    title_id BIGINT NOT NULL,
    exchange_rate_id BIGINT,
    bolivares_price NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    close_date TIMESTAMP NOT NULL,
    close_price NUMERIC NOT NULL,
    CONSTRAINT fk_prv_set_id FOREIGN KEY (title_id) REFERENCES Stock_Title(id),
    CONSTRAINT fk_prv_exr_id FOREIGN KEY (exchange_rate_id) REFERENCES Exchange_Rate(id)
);

CREATE TABLE Operation_Type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Operation(
    id SERIAL PRIMARY KEY,
    title_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    stock_amount NUMERIC NOT NULL,
    stock_price NUMERIC NOT NULL,
    exchange_rate_value NUMERIC NOT NULL,
    type_id BIGINT NOT NULL,
    register_cv_id BIGINT NOT NULL,
    iva_cv_id BIGINT NOT NULL,
    comission_cv_id BIGINT NOT NULL,
    other_comission NUMERIC NOT NULL DEFAULT 0,
    CONSTRAINT fk_ope_stock_title_id FOREIGN KEY (title_id) REFERENCES Stock_Title(id),
    CONSTRAINT fk_ope_type_id FOREIGN KEY (type_id) REFERENCES Operation_Type(id),
    CONSTRAINT fk_ope_user_id FOREIGN KEY (user_id) REFERENCES Percapital_User(id),
    CONSTRAINT fk_ope_register_cv_id FOREIGN KEY (register_cv_id) REFERENCES Constant_Value(id),
    CONSTRAINT fk_ope_iva_cv_id FOREIGN KEY (iva_cv_id) REFERENCES Constant_Value(id),
    CONSTRAINT fk_ope_comission_cv_id FOREIGN KEY (comission_cv_id) REFERENCES Constant_Value(id)
);

CREATE TABLE Stock_Historic(
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    symbol_description TEXT,
    stock_date TIMESTAMP NOT NULL,
    close_price NUMERIC,
    open_price NUMERIC,
    high_price NUMERIC,
    low_price NUMERIC,
    volume TEXT,
    change TEXT
);

CREATE UNIQUE INDEX index_stock_historic_sym_date on Stock_Historic (symbol, stock_date);
CREATE UNIQUE INDEX index_price_rv_title_date on Price_RV (title_id, close_date);