-- update pizza id in cart table
CREATE OR REPLACE FUNCTION update_pizza_id(
         pid INTEGER,
         oid VARCHAR
    ) RETURNS integer AS $$
DECLARE
  value integer;

BEGIN
WITH d as (
 UPDATE cart
 set p_id = pid
 WHERE o_id = oid
 RETURNING *
 )
    SELECT count(*)
    INTO value
    FROM d;
    RETURN value;

END;
$$ LANGUAGE plpgsql;

-- select * from update_pizza_id (3, '23012021101814')
--
--
--  UPDATE cart
--  set p_id = 4
--  WHERE o_id = '23012021112618'
--
-- RETURNING *;
