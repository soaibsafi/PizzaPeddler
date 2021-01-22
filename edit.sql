CREATE OR REPLACE FUNCTION save_order_in_cart(
        pid INTEGER,
        cid INTEGER,
        iid INTEGER,
        oid VARCHAR,
        qty INTEGER,
        price numeric

    ) RETURNS VOID AS $$
DECLARE
  orderid VARCHAR;

BEGIN
 IF oid = '' THEN
   SELECT TO_CHAR(NOW(), 'DDMMYYYYHH24MISS') INTO orderid;
 ELSE orderid = oid;
 END IF;

INSERT INTO cart (p_id, c_id, o_id, i_id, quantity, price, total_price)
values (pid, cid, orderid, iid, qty,price::money, qty*price);

END;
$$ LANGUAGE plpgsql;


--select * from t_save_order_in_cart(1,1,2,'',1,2.00)
