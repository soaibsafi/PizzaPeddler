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