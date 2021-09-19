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

CREATE TABLE Stock_Exchange_Title(
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    value VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Role(
    id SERIAL PRIMARY KEY,
    value VARCHAR(250) NOT NULL
);

CREATE TABLE Percapital_User(
    id SERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    phone_number VARCHAR(250),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role_id FOREIGN KEY (role_id) REFERENCES Role(id)
);

CREATE TABLE Price_RV(
    id SERIAL PRIMARY KEY,
    title_id BIGINT NOT NULL,
    exchange_rate_id BIGINT NOT NULL,
    bolivares_price NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    close_date TIMESTAMP NOT NULL,
    close_price NUMERIC NOT NULL,
    CONSTRAINT fk_prv_set_id FOREIGN KEY (title_id) REFERENCES Stock_Exchange_Title(id),
    CONSTRAINT fk_prv_exr_id FOREIGN KEY (exchange_rate_id) REFERENCES Exchange_Rate(id)
);

CREATE TABLE Operation_Type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Operation(
    id SERIAL PRIMARY KEY,
    price_rv_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    stock_amount NUMERIC NOT NULL,
    stock_price NUMERIC NOT NULL,
    type_id BIGINT NOT NULL,
    CONSTRAINT fk_ope_prv_id FOREIGN KEY (price_rv_id) REFERENCES Price_RV(id),
    CONSTRAINT fk_ope_type_id FOREIGN KEY (type_id) REFERENCES Operation_Type(id),
    CONSTRAINT fk_ope_user_id FOREIGN KEY (user_id) REFERENCES Percapital_User(id)
);