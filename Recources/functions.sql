-- Get All Baker
CREATE OR REPLACE FUNCTION get_all_baker() RETURNS TABLE(b_id integer, name text) AS $$ BEGIN RETURN QUERY
SELECT baker.b_id,
    baker.name
FROM public.baker;
END;
$$ LANGUAGE plpgsql;
select *
from get_all_baker();


-- Get All pizza
CREATE OR REPLACE FUNCTION get_all_pizza_size() RETURNS TABLE(p_id integer, PizzaName text) AS $$ BEGIN RETURN QUERY
SELECT pizza.p_id,
    CONCAT(pizza.size, ' (', pizza.price, ')') as PizzaName
FROM public.pizza;
END;
$$ LANGUAGE plpgsql;
select *
from get_all_pizza_size();


-- Cofirm order
CREATE OR REPLACE FUNCTION confirm_order(
        pid INTEGER,
        cid INTEGER,
        iid INTEGER,
        oid VARCHAR,
        qty INTEGER,
        fprice INTEGER
    ) RETURNS VOID AS $$ BEGIN
INSERT INTO "order" (p_id, c_id, o_id, i_id, quantity, price)
values (pid, cid, oid, iid, qty, fprice);
END;
$$ LANGUAGE plpgsql;


--- Get all ingredients for customer
CREATE OR REPLACE FUNCTION get_all_ingrediants() RETURNS TABLE(i_id integer, i_name TEXT, price MONEY) AS $$ BEGIN RETURN QUERY
SELECT ingredients.i_id,
    CONCAT(
        ingredients.name,
        ' (',
        ingredients.regional_provinance,
        ')'
    ) as i_name,
    ingredients.unit_price as price
FROM public.ingredients
WHERE ingredients.visibility = true;
END;
$$ LANGUAGE plpgsql;
select *
from get_all_ingrediants();


-- Add Ingredients
CREATE OR REPLACE FUNCTION add_new_ingredient(
        name VARCHAR,
        rp VARCHAR,
        unit_price numeric,
        qty INTEGER,
        visibility BOOLEAN,
        s_id INTEGER
    ) RETURNS VOID AS $$
DECLARE total_price MONEY;
BEGIN total_price = unit_price * qty;
INSERT INTO ingredients(
        name,
        regional_provinance,
        unit_price,
        quantity,
        visibility,
        total_price,
        s_id
    )
values (
        name,
        rp,
        unit_price::money,
        qty,
        visibility,
        total_price,
        s_id
    );
END;
$$ LANGUAGE plpgsql;
select *
from add_new_ingredient('Tomato', 'Germany', 2.49, 5, true, 2);

-- get all ingredients for baker
CREATE OR REPLACE FUNCTION get_all_ingrediants_baker() RETURNS TABLE(
        i_id integer,
        i_name varchar,
        regional_provinance VARCHAR,
        unit_price MONEY,
        quantity INTEGER,
        visibility BOOLEAN,
        total_price MONEY,
        s_name VARCHAR
    ) AS $$ BEGIN RETURN QUERY
SELECT ingredients.i_id,
    ingredients.name AS i_name,
    ingredients.regional_provinance,
    ingredients.unit_price,
    ingredients.quantity,
    ingredients.visibility,
    ingredients.total_price,
    supplier.name AS s_name
FROM public.ingredients,
    public.supplier
WHERE ingredients.s_id = supplier.s_id;
END;
$$ LANGUAGE plpgsql;
SELECT *
FROM get_all_ingrediants_baker();

-- change visibility for ingredients
CREATE OR REPLACE FUNCTION change_ingredient_visibility(id INTEGER) RETURNS VOID AS $$
DECLARE temp_visibility BOOLEAN;
BEGIN
SELECT visibility INTO temp_visibility
FROM ingredients
WHERE ingredients.i_id = id;
IF temp_visibility IS TRUE THEN temp_visibility = FALSE;
ELSE temp_visibility = TRUE;
END IF;
UPDATE ingredients
SET visibility = temp_visibility
WHERE ingredients.i_id = id;
END;
$$ LANGUAGE plpgsql;
SELECT *
FROM change_ingredient_visibility(3);

-- GET Customer
CREATE OR REPLACE FUNCTION get_customer(id INTEGER) RETURNS TABLE(c_id integer, name text) AS $$ BEGIN RETURN QUERY
SELECT customer.c_id,
    customer.name
FROM public.customer
WHERE customer.c_id = id;
END;
$$ LANGUAGE plpgsql;
select *
from get_customer(3);

-- get single ingredient
CREATE OR REPLACE FUNCTION get_ingrediant(id INTEGER) RETURNS TABLE(i_id integer, i_name TEXT, price MONEY) AS $$ BEGIN RETURN QUERY
SELECT ingredients.i_id,
       CONCAT(
               ingredients.name,
               ' (',
               ingredients.regional_provinance,
               ')'
           ) as i_name,
       ingredients.unit_price as price
FROM public.ingredients
WHERE ingredients.i_id = id;
END;
$$ LANGUAGE plpgsql;

select *
from get_ingrediant(3);


-- GET Baker
CREATE OR REPLACE FUNCTION get_baker(id INTEGER) RETURNS TABLE(b_id integer, name text) AS $$ BEGIN RETURN QUERY
    SELECT baker.b_id,
           baker.name
    FROM public.baker
    WHERE baker.b_id = id;
END;
$$ LANGUAGE plpgsql;
select *
from get_baker(2);