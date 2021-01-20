CREATE OR REPLACE FUNCTION test(id integer) RETURNS VOID AS $$
--DECLARE
  --total_price MONEY;
BEGIN
update ingredients
set ingredients.visibility = FALSE
where ingredients.i_id = id;
END;
$$ LANGUAGE plpgsql;
