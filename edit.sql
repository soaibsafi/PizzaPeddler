-- update ingredient qty in cart table
CREATE OR REPLACE FUNCTION update_ingredient_qty(
         pid INTEGER,
         cid INTEGER,
         iid INTEGER,
         oid VARCHAR,
         qty INTEGER
    ) RETURNS VOID AS $$

DECLARE
  tempPrice money;

BEGIN
  select price into tempPrice from cart where
  o_id = oid and
  i_id = iid and
  p_id = pid and
  c_id = cid;

  tempPrice = tempPrice * qty;

 UPDATE cart
 set quantity = qty,
 total_price = tempPrice
 WHERE o_id = oid and
 i_id = iid and
 p_id = pid and
 c_id = cid;

END;
$$ LANGUAGE plpgsql;

select * from update_ingredient_qty (3,1,9, '23012021101814',3)
