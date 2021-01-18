-- Get All Baker
CREATE OR REPLACE FUNCTION get_all_baker() RETURNS TABLE(b_id integer, name text) AS $$
    BEGIN
         RETURN QUERY
             SELECT baker.b_id, baker.name
             FROM public.baker;
    END;
$$ LANGUAGE plpgsql;

select * from get_all_baker();


-- Get All pizza
CREATE OR REPLACE FUNCTION get_all_pizza_size() RETURNS TABLE(p_id integer, PizzaName text) AS $$
    BEGIN
         RETURN QUERY
             SELECT pizza.p_id, CONCAT(pizza.size, ' (', pizza.price, ')') as PizzaName
             FROM public.pizza;
    END;
$$ LANGUAGE plpgsql;


select * from get_all_pizza_size();

-- Cofirm order
CREATE OR REPLACE FUNCTION confirm_order(pid INTEGER, cid INTEGER, qty INTEGER, fprice INTEGER) RETURNS VOID AS $$
declare
	   o_name TEXT;
       order_id INTEGER;
BEGIN

        SELECT o_id into order_id FROM "order" ORDER BY o_id DESC limit 1;
        order_id = order_id + 1;
        o_name = CONCAT('C',cid,'O', order_id);


        INSERT INTO "order" (p_id, c_id, name, quantity, price) values (pid, cid, o_name, qty, fprice );
END;
$$ LANGUAGE plpgsql;

--- Get all ingrediants for customer

CREATE OR REPLACE FUNCTION get_all_ingrediants()
RETURNS TABLE(i_id integer, i_name TEXT, price MONEY) AS $$
    BEGIN
         RETURN QUERY
             SELECT ingredients.i_id, CONCAT(ingredients.name, ' (', ingredients.reginal_provinance, ')') as i_name, ingredients.unit_price as price
             FROM public.ingredients;
    END;
$$ LANGUAGE plpgsql;

select * from get_all_ingrediants();
