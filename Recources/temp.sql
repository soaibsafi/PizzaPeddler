-- remove ingredient
CREATE OR REPLACE FUNCTION delete_ingredients(iid INTEGER)
    RETURNS INTEGER AS
$$
DECLARE
    cart_iid INTEGER;
    order_iid INTEGER;
    res INTEGER;

BEGIN

    select COUNT (i_id) into cart_iid from cart where i_id = iid;
    select COUNT(i_id) into order_iid from "order" where i_id = iid;

    IF cart_iid = 0 AND order_iid = 0
    THEN
        WITH d as (
        delete from ingredients where i_id = iid
        returning *)
        SELECT count(*)
        INTO res
        FROM d;
        RETURN res;
--     RETURN 'Deleted';

        ELSE
        res = 0;
        RETURN res;
--     RETURN 'This data is existed in cart or order table';

    END IF;


END;
$$ LANGUAGE plpgsql;

-- select * from  delete_ingredients(2)
-- select * from  delete_ingredients(2)


CREATE OR REPLACE FUNCTION delete_ingredients(iid INTEGER, name VARCHAR, )
    RETURNS varchar AS
$$
DECLARE
    res INTEGER;

BEGIN



END;
$$ LANGUAGE plpgsql;