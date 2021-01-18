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
