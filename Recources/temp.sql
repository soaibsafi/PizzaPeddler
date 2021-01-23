-- noinspection SqlNoDataSourceInspectionForFile

CREATE
    OR REPLACE FUNCTION remove_item_on_order_insert()
    RETURNS trigger AS
$$
BEGIN
    DELETE
    FROM cart
    WHERE cart.o_id = NEW.o_id;

    RETURN NEW;

END;
$$
LANGUAGE 'plpgsql';



CREATE TRIGGER order_insert_trigger
    AFTER INSERT
    ON "order"
    FOR EACH ROW
    EXECUTE PROCEDURE remove_item_on_order_insert();



CREATE OR REPLACE FUNCTION add_from_cart_to_order(oid VARCHAR)
    RETURNS varchar
AS
$$
DECLARE
    value INTEGER;
BEGIN
    WITH d as (
        INSERT INTO "order" (o_id, quantity, price, c_id, p_id, i_id)
            SELECT o_id, quantity, price, c_id, p_id, i_id
            FROM cart
            WHERE cart.o_id = oid
            RETURNING *
    )
    SELECT count(*)
    INTO value
    FROM d;
    RETURN format('Pizza with %s ingredients has successfully ordered.', value);

END;
$$ LANGUAGE plpgsql;

select * from add_from_cart_to_order('23012021115743');

---  -- --------------------



-- Procedure  for deleting items from cart when that item is being inserted into order.
CREATE
    OR REPLACE FUNCTION remove_item_on_order_insert()
    RETURNS trigger AS
$$
BEGIN
    DELETE
    FROM cart
    WHERE cart.o_id = NEW.o_id;

    RETURN NEW;

END;
$$
    LANGUAGE 'plpgsql';


-- Trigger to call removing item from cart after inserting into order
    CREATE TRIGGER order_insert_trigger
    AFTER INSERT
    ON "order"
    FOR EACH ROW
    EXECUTE PROCEDURE remove_item_on_order_insert();


-- Procedure to add item from cart to order
CREATE OR REPLACE FUNCTION add_from_cart_to_order(oid VARCHAR)
    RETURNS varchar
AS
$$
DECLARE
    value INTEGER;
BEGIN
    WITH d as (
        INSERT INTO "order" (o_id, quantity, price, c_id, p_id, i_id)
            SELECT o_id, quantity, price, c_id, p_id, i_id
            FROM cart
            WHERE cart.o_id = oid
            RETURNING *
    )
    SELECT count(*)
    INTO value
    FROM d;
    RETURN format('Pizza with %s ingredients has successfully ordered.', value);

END;
$$ LANGUAGE plpgsql;

select * from add_from_cart_to_order('23012021115743');