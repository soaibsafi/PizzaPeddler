-- update pizza id in cart table
CREATE OR REPLACE FUNCTION update_pizza_id(pid INTEGER,
                                           oid VARCHAR)
                                           RETURNS money AS
$$
DECLARE
    value money;
    pizza_price money;

BEGIN
     select price into pizza_price from pizza where p_id = pid;

        UPDATE cart
            set p_id = pid, p_price = pizza_price
            WHERE o_id = oid;


    select (sum(total_price) + p_price) into value from cart where o_id = oid
    group by p_price;
    RETURN value;

END;
$$ LANGUAGE plpgsql;

-- select * from update_pizza_id (3, '23012021101814')
