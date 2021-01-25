-- Get All Baker
CREATE OR REPLACE FUNCTION get_all_baker()
    RETURNS TABLE
            (
                b_id integer,
                name text
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT baker.b_id,
               baker.name
        FROM public.baker;
END;
$$ LANGUAGE plpgsql;
select *
from get_all_baker();


-- Get All pizza
CREATE OR REPLACE FUNCTION get_all_pizza_size()
    RETURNS TABLE
            (
                p_id      integer,
                PizzaName text
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT pizza.p_id,
               CONCAT(pizza.size, ' (', pizza.price, ')') as PizzaName
        FROM public.pizza;
END;
$$ LANGUAGE plpgsql;
select *
from get_all_pizza_size();


-- Cofirm order
CREATE OR REPLACE FUNCTION confirm_order(pid INTEGER,
                                         cid INTEGER,
                                         iid INTEGER,
                                         oid VARCHAR,
                                         qty INTEGER,
                                         fprice INTEGER) RETURNS VOID AS
$$
BEGIN
    INSERT INTO "order" (p_id, c_id, o_id, i_id, quantity, price)
    values (pid, cid, oid, iid, qty, fprice);
END;
$$ LANGUAGE plpgsql;


--- Get all ingredients for customer
CREATE OR REPLACE FUNCTION get_all_ingrediants()
    RETURNS TABLE
            (
                i_id   integer,
                i_name TEXT,
                price  MONEY
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT ingredients.i_id,
               CONCAT(
                       ingredients.name,
                       ' (',
                       ingredients.regional_provinance,
                       ')'
                   )                  as i_name,
               ingredients.unit_price as price
        FROM public.ingredients
        WHERE ingredients.visibility = true;
END;
$$ LANGUAGE plpgsql;
select *
from get_all_ingrediants();


-- Add Ingredients
CREATE OR REPLACE FUNCTION add_new_ingredient(name VARCHAR,
                                              rp VARCHAR,
                                              unit_price numeric,
                                              qty INTEGER,
                                              visibility BOOLEAN,
                                              s_id INTEGER) RETURNS VOID AS
$$
DECLARE
    total_price MONEY;
BEGIN
    total_price = unit_price * qty;
    INSERT INTO ingredients(name,
                            regional_provinance,
                            unit_price,
                            quantity,
                            visibility,
                            total_price,
                            s_id)
    values (name,
            rp,
            unit_price::money,
            qty,
            visibility,
            total_price,
            s_id);
END;
$$ LANGUAGE plpgsql;
select *
from add_new_ingredient('Tomato', 'Germany', 2.49, 5, true, 2);

-- get all ingredients for baker
CREATE OR REPLACE FUNCTION get_all_ingrediants_baker()
    RETURNS TABLE
            (
                i_id                integer,
                i_name              varchar,
                regional_provinance VARCHAR,
                unit_price          MONEY,
                quantity            INTEGER,
                visibility          BOOLEAN,
                total_price         MONEY,
                s_name              VARCHAR
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT ingredients.i_id,
               ingredients.name AS i_name,
               ingredients.regional_provinance,
               ingredients.unit_price,
               ingredients.quantity,
               ingredients.visibility,
               ingredients.total_price,
               supplier.name    AS s_name
        FROM public.ingredients,
             public.supplier
        WHERE ingredients.s_id = supplier.s_id;
END;
$$ LANGUAGE plpgsql;
SELECT *
FROM get_all_ingrediants_baker();

-- change visibility for ingredients
CREATE OR REPLACE FUNCTION change_ingredient_visibility(id INTEGER) RETURNS VOID AS
$$
DECLARE
    temp_visibility BOOLEAN;
BEGIN
    SELECT visibility
    INTO temp_visibility
    FROM ingredients
    WHERE ingredients.i_id = id;
    IF temp_visibility IS TRUE THEN
        temp_visibility = FALSE;
    ELSE
        temp_visibility = TRUE;
    END IF;
    UPDATE ingredients
    SET visibility = temp_visibility
    WHERE ingredients.i_id = id;
END;
$$ LANGUAGE plpgsql;
SELECT *
FROM change_ingredient_visibility(3);

-- GET Customer
CREATE OR REPLACE FUNCTION get_customer(id INTEGER)
    RETURNS TABLE
            (
                c_id integer,
                name text
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT customer.c_id,
               customer.name
        FROM public.customer
        WHERE customer.c_id = id;
END;
$$ LANGUAGE plpgsql;
select *
from get_customer(3);

-- get single ingredient
CREATE OR REPLACE FUNCTION get_ingrediant(id INTEGER)
    RETURNS TABLE
            (
                i_id       integer,
                i_name     TEXT,
                price      numeric,
                name       VARCHAR,
                rp         VARCHAR,
                up         NUMERIC,
                visibility BOOLEAN,
                sid        INTEGER
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT ingredients.i_id,
               CONCAT(
                       ingredients.name,
                       ' (',
                       ingredients.regional_provinance,
                       ')'
                   )                           as i_name,
               ingredients.unit_price::numeric as price,
               ingredients.name,
               ingredients.regional_provinance,
               ingredients.unit_price::numeric,
               ingredients.visibility,
               ingredients.s_id
        FROM public.ingredients
        WHERE ingredients.i_id = id;
END;
$$ LANGUAGE plpgsql;

select *
from get_ingrediant(3);


-- GET Baker
CREATE OR REPLACE FUNCTION get_baker(id INTEGER)
    RETURNS TABLE
            (
                b_id integer,
                name text
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT baker.b_id,
               baker.name
        FROM public.baker
        WHERE baker.b_id = id;
END;
$$ LANGUAGE plpgsql;
select *
from get_baker(2);



-- Check if the ingredient exist in the cart table
CREATE OR REPLACE FUNCTION check_ingredient_in_cart(oid VARCHAR,
                                                    iid INTEGER,
                                                    cid INTEGER) RETURNS TEXT AS
$$

BEGIN
    IF EXISTS(SELECT
              FROM public.cart
              WHERE cart.o_id = oid
                AND cart.c_id = cid
                AND cart.i_id = iid) THEN

        RETURN 'This item is already in your cart. You can update the quantity in the cart';
    ELSE
        RETURN '';
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT *
FROM check_ingredient_in_cart('22012021210415', 5, 5);


-- save data in cart table
CREATE OR REPLACE FUNCTION save_order_in_cart(pid INTEGER,
                                              cid INTEGER,
                                              iid INTEGER,
                                              oid VARCHAR,
                                              qty INTEGER,
                                              price numeric)
    RETURNS TABLE
            (
                o_id       VARCHAR,
                i_name     TEXT,
                unit_price MONEY,
                totalprice MONEY
            )
AS
$$
DECLARE
    orderid VARCHAR;

BEGIN
    IF oid = '' THEN
        SELECT TO_CHAR(NOW(), 'DDMMYYYYHH24MISS') INTO orderid;
    ELSE
        orderid = oid;
    END IF;

    INSERT INTO cart (p_id, c_id, o_id, i_id, quantity, price, total_price)
    values (pid, cid, orderid, iid, qty, price::money, qty * price);

    RETURN QUERY
        select cart.o_id             AS o_id,
               CONCAT
                   (
                       (SELECT ingredients.name
                        FROM ingredients
                        where ingredients.i_id = iid), ' (',
                       (SELECT ingredients.regional_provinance
                        FROM ingredients
                        where ingredients.i_id = iid),
                       ')'
                   )
                                     as i_name,
               (SELECT ingredients.unit_price as unit_price
                FROM ingredients
                where ingredients.i_id = iid),
               SUM(cart.total_price) AS totalprice
        FROM public.cart
        WHERE cart.o_id = orderid
        GROUP BY cart.o_id;

END;
$$ LANGUAGE plpgsql;

select *
from save_order_in_cart(1, 2, 4, '', 1, 4.00)

-- update pizza id in cart table
CREATE OR REPLACE FUNCTION update_pizza_id(pid INTEGER,
                                           oid VARCHAR)
    RETURNS money AS
$$
DECLARE
    value       money;
    pizza_price money;

BEGIN
    select price into pizza_price from pizza where p_id = pid;

    UPDATE cart
    set p_id    = pid,
        p_price = pizza_price
    WHERE o_id = oid;


    select (sum(total_price) + p_price)
    into value
    from cart
    where o_id = oid
    group by p_price;
    RETURN value;

END;
$$ LANGUAGE plpgsql;

-- select * from update_pizza_id (3, '23012021101814')


-- update ingredient qty in cart table
CREATE OR REPLACE FUNCTION update_ingredient_qty(pid INTEGER,
                                                 cid INTEGER,
                                                 iid INTEGER,
                                                 oid VARCHAR,
                                                 qty INTEGER)
    RETURNS money AS
$$

DECLARE
    tempPrice money;
    value     money;

BEGIN
    select price
    into tempPrice
    from cart
    where o_id = oid
      and i_id = iid
      and p_id = pid
      and c_id = cid;

    tempPrice = tempPrice * qty;

    UPDATE cart
    set quantity    = qty,
        total_price = tempPrice
    WHERE o_id = oid
      and i_id = iid
      and p_id = pid
      and c_id = cid;

    select (sum(total_price) + p_price)
    into value
    from cart
    where o_id = oid
    group by p_price;
    RETURN value;

END;
$$ LANGUAGE plpgsql;

-- select * from update_ingredient_qty(1, 1, 2, '23012021115857', 16)


CREATE OR REPLACE FUNCTION remove_item_from_cart(oid VARCHAR,
                                                 pid INTEGER,
                                                 iid INTEGER,
                                                 cid INTEGER)
    RETURNS money
AS
$$
DECLARE
    value money;
BEGIN

    DELETE
    FROM cart
    WHERE cart.o_id = oid
      AND cart.p_id = pid
      AND cart.i_id = iid
      AND cart.c_id = cid;

    select (sum(total_price) + p_price)
    into value
    from cart
    where o_id = oid
    group by p_price;
    RETURN value;

END;
$$ LANGUAGE plpgsql;

--select * from remove_item_from_cart('22012021222912', 1, 2, 1);

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

-- select * from add_from_cart_to_order('23012021115743');

-- remove ingredient
CREATE OR REPLACE FUNCTION delete_ingredients(iid INTEGER)
    RETURNS varchar AS
$$
DECLARE
    cart_iid  INTEGER;
    order_iid INTEGER;
    value     integer;

BEGIN

    select COUNT(i_id) into cart_iid from cart where i_id = iid;
    select COUNT(i_id) into order_iid from "order" where i_id = iid;

    IF cart_iid = 0 AND order_iid = 0
    THEN
        with d as (delete from ingredients where i_id = iid
            RETURNING *)
        SELECT count(*)
        INTO value
        FROM d;
        RETURN 'Deleted';

    ELSE
        RETURN 'This data is existed in cart or order table';

    END IF;


END;
$$ LANGUAGE plpgsql;

-- select * from  delete_ingredients(2)

-- update ingredients information
CREATE OR REPLACE FUNCTION update_ingredients_info(iid integer,
                                                   iname varchar,
                                                   region VARCHAR,
                                                   unitPrice numeric,
                                                   visible boolean,
                                                   sid integer)
    RETURNS void AS
$$
DECLARE
    q integer;
BEGIN
    select quantity into q from ingredients where i_id = iid;
    UPDATE ingredients
    set name                = iname,
        regional_provinance = region,
        unit_price          = unitPrice,
        visibility          = visible,
        s_id                = sid,
        total_price         = q * unitPrice
    WHERE i_id = iid;

END;
$$ LANGUAGE plpgsql;

-- select * from  update_ingredients_info( 13,'Cheese','India',2.00,false,1)

-- get all suppliers
CREATE OR REPLACE FUNCTION getAllSupplier()
    RETURNS TABLE
            (
                sid   integer,
                sname varchar
            )
AS
$$

BEGIN
    return query
        select s_id, name from supplier where visibility = true;

END;
$$ LANGUAGE plpgsql;

-- select * from  getAllSupplier()

-- order new ingredients
CREATE OR REPLACE FUNCTION order_an_ingredient(iid integer,
                                               sid integer,
                                               qty numeric)
    RETURNS void AS
$$

DECLARE
    tp numeric ;

BEGIN

    select unit_price into tp from ingredients where i_id = iid;

    update ingredients
    set s_id        = sid,
        quantity    = qty,
        total_price = tp * qty
    where i_id = iid;


END;
$$ LANGUAGE plpgsql;

-- select * from  order_an_ingredient(12,1,3)

-- add new supplier
CREATE OR REPLACE FUNCTION save_New_Supplier(sname varchar,
                                             svisibility boolean)
    RETURNS varchar AS
$$

BEGIN

    insert into supplier (name, visibility) values (sname, svisibility);
    return 'Supplier saved successfully';


END;
$$ LANGUAGE plpgsql;

-- select * from  save_New_Supplier('dummy',True)

-- get all supplier no visibility check
CREATE OR REPLACE FUNCTION get_all_suppliers_no_visibility()
    RETURNS table
            (
                sid      integer,
                sname    varchar,
                svisible boolean
            )
AS
$$

BEGIN

    return query
        select * from supplier;

END;
$$ LANGUAGE plpgsql;

-- select * from  get_all_suppliers_no_visibility()

-- get a supplier visibility
CREATE OR REPLACE FUNCTION get_supplier_visibility(id integer)
    RETURNS table
            (
                sid      integer,
                svisible boolean
            )
AS
$$

BEGIN

    return query
        select s_id, visibility from supplier where s_id = id;


END;
$$ LANGUAGE plpgsql;

-- select * from  get_supplier_visibility(9)

-- update a supplier visibility
CREATE OR REPLACE FUNCTION update_supplier_visibility(id integer, svisibility boolean)
    RETURNS varchar AS
$$

BEGIN

    update supplier
    set visibility = svisibility
    where s_id = id;

    return 'This supplier has been updated';

END;
$$ LANGUAGE plpgsql;

-- select * from  update_supplier_visibility(9)

-- show an order details

drop function get_an_order_details(id varchar);

CREATE OR REPLACE FUNCTION get_an_order_details(id varchar)
    RETURNS table
            (
                oid   VARCHAR,
                oqty  INTEGER,
                iname text,
                sQty  integer,
                pname text,
                cname text,
                iid   integer,
                status text
            )
AS
$$

BEGIN

    return query
        select o.o_id,
               o.quantity as oQty,
               i.name::text,
               i.quantity as sQty,
               p.size::text,
               c.name::text,
               o.i_id,
               ( CASE WHEN o.quantity > i.quantity THEN 'Out of Stock'
                      ELSE 'In stock'
                   END
                   ) as s

        from "order" as o

                 join customer as c on o.c_id = c.c_id
                 join ingredients as i on o.i_id = i.i_id
                 join pizza as p on o.p_id = p.p_id

        where o_id = id
          and o.i_id in (select i_id from ingredients)
          and o.c_id = c.c_id
          and o.p_id = p.p_id;

END;
$$ LANGUAGE plpgsql;

-- select * from  get_an_order_details('24012021225816')




-- delete an order and update the ingredient table
drop function deliver_an_order(oid varchar, iid integer, iqty integer);

CREATE OR REPLACE FUNCTION deliver_an_order(oid varchar, iid integer, iqty integer)
    RETURNS void AS
$$
declare
    i_qty integer;
BEGIN

    select quantity into i_qty from ingredients where i_id = iid;

    update ingredients
    set quantity = i_qty - iqty
    where i_id = iid;

    delete from "order" where o_id = oid and i_id = iid;


END;
$$ LANGUAGE plpgsql;

-- select * from  deliver_an_order('24012021131559',15,1)




-- Delete order after served
CREATE OR REPLACE FUNCTION delete_order(oid VARCHAR)
    RETURNS varchar AS
$$
DECLARE
    value integer;
BEGIN
    with d as (delete from "order" where "order".o_id = oid
        RETURNING *)
    SELECT count(*)
    INTO value
    FROM d;
    RETURN format('Order with %s ingredients has successfully served!', value);

END;
$$ LANGUAGE plpgsql;

select *
from delete_order('24012021131559');

-- update ingredient qty
drop function update_ingredient_info(id varchar);

CREATE OR REPLACE FUNCTION update_ingredient_info(iid integer, sid integer, newqty integer)
    RETURNS text AS
$$
declare
    upqty integer;

BEGIN
    select quantity into upqty from ingredients where ingredients.i_id = iid;

    upqty = upqty + newqty;

    update ingredients
    set quantity = upqty,
        s_id     = sid
    where ingredients.i_id = iid;
    return 'This ingredient has been updated';

END;
$$ LANGUAGE plpgsql;

-- select * from  update_ingredient_info(5,1,15)



-- Delete a supplier using id
CREATE OR REPLACE FUNCTION delete_supplier(sid INTEGER)
    RETURNS void AS
$$
BEGIN
    delete from supplier where supplier.s_id = sid;
END;
$$ LANGUAGE plpgsql;

select *
from delete_supplier(5);



-- GEt the details of an order
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

-- get all customer
drop function get_all_customer();

CREATE OR REPLACE FUNCTION get_all_customer()
    RETURNS table
            ( id integer,
              cname text
            ) AS
$$

BEGIN

    return query
        select c_id, name::text from customer;

END;
$$ LANGUAGE plpgsql;

-- select * from  get_all_customer()




CREATE OR REPLACE FUNCTION get_all_ingredient_for_order()
    RETURNS TABLE
            (
                i_id      integer,
                IngredientName text
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT ingredients.i_id,
               CONCAT(ingredients.name, ' (', ingredients.regional_provinance, ')') as PizzaNaIngredientNameme
        FROM public.ingredients;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_all_ingredient_for_order();
