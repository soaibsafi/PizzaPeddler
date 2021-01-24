-- order new ingredients
CREATE OR REPLACE FUNCTION order_an_ingredient(
iid integer,
sid integer,
qty numeric
)
RETURNS void AS
$$

DECLARE
 tp numeric ;

BEGIN

select unit_price into tp from ingredients where i_id = iid;

update ingredients set
s_id = sid,
quantity = qty,
total_price = tp*qty
where i_id = iid;


END;
$$ LANGUAGE plpgsql;

-- select * from  order_an_ingredient(12,1,3)
