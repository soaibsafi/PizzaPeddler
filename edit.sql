-- update a supplier visibility
CREATE OR REPLACE FUNCTION update_supplier_visibility( id integer, svisibility boolean)
RETURNS varchar AS
$$

BEGIN

update supplier set visibility = svisibility
where s_id = id;

return 'This supplier has been updated';

END;
$$ LANGUAGE plpgsql;

-- select * from  update_supplier_visibility(9)
