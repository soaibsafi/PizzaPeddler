-- remove ingredient
CREATE OR REPLACE FUNCTION get_all_order_details(oid VARCHAR)
    RETURNS TABLE
            (
                iname VARCHAR,
                order_i_qty INTEGER,
                stock_i_qty INTEGER,
                cname VARCHAR,
                p_size varchar
            )
AS
$$
DECLARE
    order_iid INTEGER;
BEGIN
    SELECT iid INTO order_iid FROM "order" WHERE o_id = oid;
    RETURN QUERY
        SELECT  ingredients.name as iname,
                (SELECT "order".quantity as order_i_qty
                    FROM "order"
                    WHERE "order".o_id = oid),
                ingredients.quantity as stock_i_qty,


        FROM ingredients
    WHERE ingredients.i_id = order_iid;

END;
$$ LANGUAGE plpgsql;

select *
from get_all_order();
-- select * from  delete_ingredients(2)


CREATE OR REPLACE FUNCTION delete_ingredients(iid INTEGER, name VARCHAR,)
    RETURNS varchar AS
$$
DECLARE
    res INTEGER;

BEGIN


END;
$$ LANGUAGE plpgsql;