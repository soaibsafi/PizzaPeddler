CREATE
OR REPLACE FUNCTION get_all_ingrediants_baker()
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
$$
LANGUAGE plpgsql;



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