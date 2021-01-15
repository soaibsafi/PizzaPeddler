CREATE TABLE customer(
  C_ID SERIAL PRIMARY KEY NOT NULL,
  NAME TEXT NOT NULL
);

INSERT INTO customer(NAME) VALUES ('Saddaf');
INSERT INTO customer(NAME) VALUES ('Afrin');
INSERT INTO customer(NAME) VALUES ('Safi');
INSERT INTO customer(NAME) VALUES ('Soaib');

CREATE TABLE baker(
  B_ID SERIAL PRIMARY KEY NOT NULL,
  NAME TEXT NOT NULL
);

INSERT INTO baker(NAME) VALUES ('Saddaf');
INSERT INTO baker(NAME) VALUES ('Safi');


-- INGREDIENTS
CREATE TABLE ingredients(
  i_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  reginal_provinance VARCHAR(40) NOT NULL,
  unit_price MONEY NOT NULL,
  quantity INTEGER NOT NULL,
  visibility BOOLEAN,
  total_price MONEY NOT NULL
);

ALTER TABLE ingredients
ADD COLUMN total_price REAL NOT NULL;

ALTER TABLE ingredients 
RENAME COLUMN price TO unit_price;

INSERT INTO ingredients(name, reginal_provinance, unit_price, quantity, visibility, total_price) VALUES 
('Potato', 'Germany', 15,  10, True, 150);
INSERT INTO ingredients(name, reginal_provinance, unit_price, quantity, visibility, total_price) VALUES 
('Tomato', 'Spain', 3,  15, True, 45);


-- pizza
CREATE TABLE pizza(
  p_id SERIAL NOT NULL PRIMARY KEY,
  size VARCHAR(10) NOT NULL,
  price MONEY NOT NULL
);

INSERT INTO pizza(size, price) VALUES ('S', 2);
INSERT INTO pizza(size, price) VALUES ('M', 3.5);
INSERT INTO pizza(size, price) VALUES ('L', 4.5);
INSERT INTO pizza(size, price) VALUES ('XL', 6);


-- order
CREATE TABLE "order"(
  o_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  price MONEY NOT NULL
);

INSERT INTO "order"(name, quantity, price) VALUES('1501212131', 2, 9.5);
INSERT INTO "order"(name, quantity, price) VALUES('1501212132', 3, 6);
INSERT INTO "order"(name, quantity, price) VALUES('1501212133', 1, 2);


-- supplier
CREATE TABLE supplier(
  s_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(15) NOT NULL,
  visibility BOOLEAN NOT NULL
);

INSERT INTO supplier(name, visibility) VALUES('Kowshik', True);
INSERT INTO supplier(name, visibility) VALUES('Rizvee', False);
