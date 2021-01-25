CREATE TABLE customer
(
    C_ID SERIAL PRIMARY KEY NOT NULL,
    NAME TEXT               NOT NULL
);

INSERT INTO customer(NAME)
VALUES ('Saddaf');
INSERT INTO customer(NAME)
VALUES ('Afrin');
INSERT INTO customer(NAME)
VALUES ('Safi');
INSERT INTO customer(NAME)
VALUES ('Soaib');


CREATE TABLE baker
(
    B_ID SERIAL PRIMARY KEY NOT NULL,
    NAME TEXT               NOT NULL
);

INSERT INTO baker(NAME)
VALUES ('Saddaf');
INSERT INTO baker(NAME)
VALUES ('Safi');

-- pizza
CREATE TABLE pizza
(
    p_id  SERIAL      NOT NULL PRIMARY KEY,
    size  VARCHAR(10) NOT NULL,
    price MONEY       NOT NULL
);
INSERT INTO pizza(size, price)
VALUES ('S', 2);
INSERT INTO pizza(size, price)
VALUES ('M', 3.5);
INSERT INTO pizza(size, price)
VALUES ('L', 4.5);
INSERT INTO pizza(size, price)
VALUES ('XL', 6);

-- INGREDIENTS
CREATE TABLE ingredients
(
    i_id                SERIAL      NOT NULL PRIMARY KEY,
    name                VARCHAR(40) NOT NULL,
    regional_provinance VARCHAR(40) NOT NULL,
    unit_price          MONEY       NOT NULL,
    quantity            INTEGER     NOT NULL,
    visibility          BOOLEAN     NOT NULL,
    total_price         MONEY       NOT NULL,
    s_id                INTEGER     NOT NULL
);

-- order
CREATE TABLE "order"
(
    o_id     VARCHAR(255),
    quantity INTEGER NOT NULL,
    price    MONEY   NOT NULL,
    c_id     INTEGER NOT NULL,
    p_id     INTEGER,
    i_id     INTEGER,
    CONSTRAINT fk_customer FOREIGN KEY (c_id) REFERENCES customer (c_id),
    CONSTRAINT fk_pizza FOREIGN KEY (p_id) REFERENCES pizza (p_id),
    CONSTRAINT fk_ingredients FOREIGN KEY (i_id) REFERENCES ingredients (i_id),
    PRIMARY KEY (o_id, p_id, i_id)
);

-- supplier
CREATE TABLE supplier
(
    s_id       SERIAL      NOT NULL PRIMARY KEY,
    name       VARCHAR(15) NOT NULL,
    visibility BOOLEAN     NOT NULL
);

--- cart table
CREATE TABLE cart
(
    o_id        VARCHAR(255),
    quantity    INTEGER NOT NULL,
    price       MONEY   NOT NULL,
    c_id        INTEGER NOT NULL,
    p_id        INTEGER,
    i_id        INTEGER,
    total_price MONEY   NOT NULL,
    p_price     MONEY   NOT NULL,
    CONSTRAINT fk_customer FOREIGN KEY (c_id) REFERENCES customer (c_id),
    CONSTRAINT fk_pizza FOREIGN KEY (p_id) REFERENCES pizza (p_id),
    CONSTRAINT fk_ingredients FOREIGN KEY (i_id) REFERENCES ingredients (i_id),
    PRIMARY KEY (o_id, p_id, i_id)
);