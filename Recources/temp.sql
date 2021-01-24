CREATE
    OR REPLACE FUNCTION update_stock_on_order_served()
    RETURNS trigger AS
$$
BEGIN
    UPDATE ingredients
    SET quantity = (SELECT ingredients.quantity
                    FROM ingredients,
                         "order"
                    WHERE ingredients.i_id = OLD.i_id
                      AND "order".o_id = OLD.o_id
                   )::INTEGER - OLD.quantity;
    RETURN OLD;

END;
$$
    LANGUAGE 'plpgsql';


-- Trigger to call removing item from cart after inserting into order
    CREATE TRIGGER order_served_trigger
    BEFORE DELETE
    ON "order"
    FOR EACH ROW
EXECUTE PROCEDURE update_stock_on_order_served();


-- select * from  delete_ingredients(2)


CREATE OR REPLACE FUNCTION delete_ingredients(iid INTEGER, name VARCHAR,)
    RETURNS varchar AS
$$
DECLARE
    res INTEGER;

BEGIN


END;
$$ LANGUAGE plpgsql;