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