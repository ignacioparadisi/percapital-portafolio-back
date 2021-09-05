CREATE DATABASE IF NOT EXISTS percapital;

\c percapital

CREATE TABLE Constant_Type(
    cot_id SERIAL PRIMARY KEY,
    cot_name  VARCHAR(100) NOT NULL,
    cot_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Type_Value(
    tva_id SERIAL PRIMARY KEY,
    tva_cot_id BIGINT NOT NULL,
    tva_value NUMERIC NOT NULL,
    tva_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tva_cot_id FOREIGN KEY (tva_cot_id) REFERENCES Constant_Type (cot_id)
);

CREATE TABLE Exchange_Rate(
    exr_id SERIAL PRIMARY KEY,
    exr_value NUMERIC NOT NULL,
    exr_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stock_Exchange_Title(
    set_id SERIAL PRIMARY KEY,
    set_description TEXT NOT NULL,
    set_value VARCHAR(100) NOT NULL,
    set_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Price_RV(
    prv_id SERIAL PRIMARY KEY,
    prv_set_id BIGINT NOT NULL,
    prv_exr_id BIGINT NOT NULL,
    prv_bolivares_price NUMERIC NOT NULL,
    prv_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    prv_close_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_prv_set_id FOREIGN KEY (prv_set_id) REFERENCES Stock_Exchange_Title(set_id),
    CONSTRAINT fk_prv_exr_id FOREIGN KEY (prv_exr_id) REFERENCES Exchange_Rate(exr_id)
);

CREATE TABLE Operation_Type(
    opt_id SERIAL PRIMARY KEY,
    opt_name VARCHAR(100) NOT NULL
);

CREATE TABLE Operation(
    ope_id SERIAL PRIMARY KEY,
    ope_prv_id BIGINT NOT NULL,
    ope_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ope_stock_amount NUMERIC NOT NULL,
    ope_stock_price NUMERIC NOT NULL,
    ope_type_id BIGINT NOT NULL,
    CONSTRAINT fk_ope_prv_id FOREIGN KEY (ope_prv_id) REFERENCES Price_RV(prv_id),
    CONSTRAINT fk_ope_type_id FOREIGN KEY (ope_type_id) REFERENCES Operation_Type(opt_id)
);