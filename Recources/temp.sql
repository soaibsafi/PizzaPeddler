CREATE OR REPLACE FUNCTION get_an_order_details(id varchar)
RETURNS table
 (
   oid VARCHAR,
   oqty INTEGER,
   iname text,
   sQty integer,
   pname text,
   cname text,
   iid integer

--   ,status text
) AS
$$

BEGIN

return query
select o.o_id, o.quantity as oQty , CONCAT(i.name, ' (', i.regional_provinance, ')')::text, i.quantity as sQty,
       p.size::text,c.name::text,o.i_id
from "order" as o

         join customer as c on o.c_id = c.c_id
         join ingredients as i on o.i_id = i.i_id
         join pizza as p on o.p_id = p.p_id

where
        o_id=id
  and o.i_id in (select i_id from ingredients)
  and o.c_id = c.c_id
  and o.p_id = p.p_id;

END;
$$ LANGUAGE plpgsql;