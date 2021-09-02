CREATE DATABASE IF NOT EXISTS percapital;

\c percapital

CREATE TABLE Constant_Type
(
 ct_id numeric NOT NULL,
 ct_name  varchar(100) NOT NULL,
 CONSTRAINT PK_constanttype PRIMARY KEY ( ct_id )
);

CREATE TABLE Type_Value
(
 tv_id        numeric NOT NULL,
 tv_ct_id     numeric NOT NULL,
 tv_value        numeric NOT NULL,
 tv_creationDate timestamp NOT NULL,
 CONSTRAINT PK_typevalue PRIMARY KEY ( tv_id, tv_ct_id ),
 CONSTRAINT FK_53 FOREIGN KEY ( tv_ct_id ) REFERENCES Constant_Type ( ct_id )
);

CREATE TABLE Exchange_Rate
(
 er_id        numeric NOT NULL,
 er_value        numeric NOT NULL,
 er_creationDate timestamp NOT NULL,
 CONSTRAINT PK_exchangerate PRIMARY KEY ( er_id )
);

CREATE TABLE Stock_Exchange_Title
(
 st_id        numeric NOT NULL,
 st_description  text NOT NULL,
 st_value        varchar(100) NOT NULL,
 st_creationDate timestamp NOT NULL,
 CONSTRAINT PK_stockexchangetitle PRIMARY KEY ( st_id )
);

CREATE TABLE Price_RV
(
 pr_id          numeric NOT NULL,
 pr_st_id       numeric NOT NULL,
 pr_er_id       numeric NOT NULL,
 pr_bolivaresPrice numeric NOT NULL,
 pr_creationDate   timestamp NOT NULL,
 pr_closeDate      timestamp NOT NULL,
 CONSTRAINT PK_pricerv PRIMARY KEY ( pr_id, pr_st_id, pr_er_id ),
 CONSTRAINT FK_45 FOREIGN KEY ( pr_st_id ) REFERENCES Stock_Exchange_Title ( st_id ),
 CONSTRAINT FK_49 FOREIGN KEY ( pr_er_id ) REFERENCES Exchange_Rate ( er_id )
);

CREATE TABLE Operation
(
 op_id           numeric NOT NULL,
 op_p_id         numeric NOT NULL,
 op_st_id        numeric NOT NULL,
 op_er_id        numeric NOT NULL,
 op_creationDate    timestamp NOT NULL,
 op_numberOfActions numeric NOT NULL,
 op_price           numeric NOT NULL,
 op_type            varchar(100) NOT NULL,
 CONSTRAINT PK_selloperation PRIMARY KEY ( op_id, op_p_id, op_st_id, op_er_id ),
 CONSTRAINT FK_42 FOREIGN KEY ( op_p_id, op_st_id, op_er_id ) REFERENCES Price_RV ( pr_id, pr_st_id, pr_er_id )
);

CREATE INDEX fkIdx_54 ON Type_Value
(
 tv_ct_id
);

CREATE INDEX fkIdx_46 ON Price_RV
(
 pr_st_id
);

CREATE INDEX fkIdx_50 ON Price_RV
(
 pr_er_id
);

CREATE INDEX fkIdx_43 ON Operation
(
 op_p_id,
 op_st_id,
 op_er_id
);