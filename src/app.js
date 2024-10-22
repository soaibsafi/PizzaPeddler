const path = require("path");
const {Pool, Client} = require("pg");

const express = require("express");
const hbs = require("hbs");

var client = new Client({
    user: "pbmdb_rw",
    host: "pgsql.hrz.tu-chemnitz.de",
    database: "pbmdb",
    password: "ingah4eiW",
    port: 5432,
});


client.connect((err) => {
    if (err) {
        console.error("connection error", err.stack);
    } else {
        console.log("connected");
    }
});


const app = express();

app.use(express.json());

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and view location
app.set("view engine", "hbs"); //set the view engine as hadlebars
app.set("views", viewPath);


app.get("", (req, res) => {
    res.render("welcome", {
    });
});


// Routes for customer view
app.get("/getallcustomer", (request, response) => {
    var query = {
        text: "select * from get_all_customer()",
        // values: [parseInt(request.query.id)],
    };

    client.query(query, (err, res) => {
        response.send( {
            userData: res.rows,
        });
    });
});

app.get("/user", (request, response) => {
    if (!request.query.id) {
        return response.send({
            error: "You have to provide an user id",
        });
    }

    var query = {
        text: "select * from get_customer($1)",
        values: [parseInt(request.query.id)],
    };

    client.query(query, (err, res) => {
        //    client.end();
        response.render("customer", {
            username: res.rows[0]["name"],
        });
    });
});

app.get("/getPizzaSize", (request, response) => {
    var pizzaquery = {
        text: "select * from get_all_pizza_size()",
    };
    client.query(pizzaquery, (err, res) => {

        response.send({
            pizzaData: res.rows,
        });
    });
});

app.get("/checkDuplicateIngredientsInCart", (request, response) => {
    let ingredientsQueryBaker = {
        name: "check-duplicate-ingredients-cart",
        text: "select * from check_ingredient_in_cart($1,$2,$3)",
        values: [request.query.oid,
            parseInt(request.query.iID),
            parseInt(request.query.cid)]
    };
    client.query(ingredientsQueryBaker, (err, res) => {
        response.send({
            checkIngredientsData: res.rows,
        });
    });
});

app.get("/saveIngredientsInCart", (request, response) => {
    var saveInCartQuery = {
        name: "save-ingredient-in-cart",
        text: "select * from save_order_in_cart($1,$2,$3,$4,$5,$6)",
        values: [parseInt(request.query.pid),
            parseInt(request.query.cid),
            parseInt(request.query.ingID),
            request.query.oID,
            parseInt(request.query.qty),
            parseFloat(request.query.price)]
    };

    client.query(saveInCartQuery, (err, res) => {
        response.send({
            cartData: res.rows
        });
    });
})

app.get("/updatePizzaId", (request, response) => {
    var pizzaIdUpdateQuery = {
        name: "update-pizza-id-cart",
        text: "select * from update_pizza_id($1,$2)",
        values: [parseInt(request.query.pid),
            request.query.oid]
    };
    client.query(pizzaIdUpdateQuery, (err, res) => {
        response.send({
            updateData: res.rows
        });
    });
});

app.get("/removeIngredientsFromCart", (request, response) => {
    var pizzaIdUpdateQuery = {
        name: "remove-ingredients-from-cart",
        text: "select * from remove_item_from_cart($1,$2,$3,$4)",
        values: [request.query.oid,
            parseInt(request.query.pid),
            parseInt(request.query.iid),
            parseInt(request.query.cid)
        ]
    };
    client.query(pizzaIdUpdateQuery, (err, res) => {
        response.send({
            removedData: res.rows
        });
    });
});

app.get("/updateIngredientQtyinCart", (request, response) => {
    var ingerdientQtyQuery = {
        name: "update-ingredient-qty-incart",
        text: "select * from update_ingredient_qty($1,$2,$3,$4,$5)",
        values: [parseInt(request.query.pid),
            parseInt(request.query.cid),
            parseInt(request.query.iid),
            request.query.oid,
            parseInt(request.query.qty)
        ]
    };
    client.query(ingerdientQtyQuery, (err, res) => {
        response.send({
            updateData: res.rows
        });
    });
});

app.get("/confirmOrder", (request, response) => {

    let confirmOrderQuery = {
        name: "confirm-order",
        text: "select * from add_from_cart_to_order($1)",
        values: [request.query.id]
    };
    client.query(confirmOrderQuery, (err, res) => {
        response.send({
            confirmOrderData: res.rows,
        });
    });
});

/*****************************************************/

// Routes For Baker View
app.get("/getallbaker", (request, response) => {
    var query = {
        text: "select * from get_all_baker()",
        // values: [parseInt(request.query.id)],
    };

    client.query(query, (err, res) => {
        response.send( {
            userData: res.rows,
        });
    });
});

app.get("/baker", (request, response) => {
    if (!request.query.id) {
        return response.send({
            error: "You have to provide an user id",
        });
    }

    let bakerQuery = {
        text: "select * from get_baker($1)",
        values: [parseInt(request.query.id)],
    };
    client.query(bakerQuery, (err, res) => {
        response.render("baker", {
            username: res.rows[0]["name"],
        });
    });
});

app.get("/getAllIngredientsForBaker", (request, response) => {
    let ingredientsQueryBaker = {
        name: "fetch-ingredients-baker",
        text: "select * from get_all_ingrediants_baker ()",
    };
    client.query(ingredientsQueryBaker, (err, res) => {
        response.send({
            ingredientsData: res.rows,
        });
    });
});

app.get("/getIngredientInfo", (request, response) => {

    var ingredientsQuery = {
        name: "fetch-one-ingredient-info",
        text: "select * from get_ingrediant($1)",
        values: [parseInt(request.query.id)]
    };
    client.query(ingredientsQuery, (err, res) => {
        response.send({
            ingredientData: res.rows,
        });
    });
});

app.get("/updateIngredientFromBaker", (request, response) => {
    console.log('updateIngredientFromBaker Route')
    let updateIngredientQuery = {
        name: "update-ingredient-from-baker",
        text: "select * from update_ingredients_info($1,$2,$3,$4,$5,$6)",
        values: [
            parseInt(request.query.iid),
            request.query.iname,
            request.query.rp,
            parseFloat(request.query.up),
            request.query.visibility,
            parseInt(request.query.sid)
        ]
    };
    client.query(updateIngredientQuery, (err, res) => {
        response.send({
            updateIngredientData: res.rows
        });
    });
});

app.get("/deleteIngredientFromBaker", (request, response) => {
    let deleteIngredientQuery = {
        name: "delete-ingredient-from-baker",
        text: "select * from delete_ingredients($1)",
        values: [parseInt(request.query.id)]
    };
    client.query(deleteIngredientQuery, (err, res) => {
        response.send({
            deleteIngredientData: res.rows,
        });
    });
});

app.get("/getAllSupplier", (request, response) => {
    let supplierQuery = {
        text: "select * from getallsupplier()",
    };
    client.query(supplierQuery, (err, res) => {

        response.send({
            supplierData: res.rows,
        });
    });
});

app.get("/newIngredient", (request, response) => {
    if (!request.query.id) {
        return response.send({
            error: "You have to provide an user id",
        });
    }

    let bakerQuery = {
        text: "select * from get_baker($1)",
        values: [parseInt(request.query.id)],
    };
    client.query(bakerQuery, (err, res) => {
        response.render("newIngredient", {
            username: res.rows[0]["name"],
        });
    });
});

app.get("/addNewIngredient", (request, response) => {
    let updateIngredientQuery = {
        name: "add-new-ingredient-baker",
        text: "select * from add_new_ingredient($1,$2,$3,$4,$5,$6)",
        values: [
            request.query.iname,
            request.query.rp,
            parseFloat(request.query.up),
            parseInt(request.query.qty),
            request.query.visibility,
            parseInt(request.query.sid)
        ]
    };
    client.query(updateIngredientQuery, (err, res) => {
        response.send({
            newIngredientData: res.rows
        });
    });
});

app.get("/getAllOrder", (request, response) => {
    let supplierQuery = {
        text: "select * from get_all_order()",
    };
    client.query(supplierQuery, (err, res) => {

        response.send({
            orderData: res.rows,
        });
    });
});

app.get("/getAllOrderDetails", (request, response) => {
    let orderDetailsQuery = {
        name: "ge-all-order-details",
        text: "select * from get_an_order_details($1)",
        values: [
            request.query.oid
        ]
    };
    client.query(orderDetailsQuery, (err, res) => {

        response.send({
            orderDetailsData: res.rows,
        });
    });
});

app.get("/viewOrder", (request, response) => {
    if (!request.query.id) {
        return response.send({
            error: "You have to provide an user id",
        });
    }

    let bakerQuery = {
        text: "select * from get_baker($1)",
        values: [parseInt(request.query.id)],
    };
    client.query(bakerQuery, (err, res) => {
        response.render("vieworder", {
            username: res.rows[0]["name"],
        });
    });
});

app.get("/manageSuppliers", (request, response) => {
    response.render("supplier", {
        id: request.query.id
    });
});

app.get("/saveSupplier", (request, response) => {
    let addSupplierQuery = {
        name: 'save-supplier-info',
        text: "select * from save_New_Supplier($1,$2)",
        values: [request.query.name, request.query.visible]
    };

    client.query(addSupplierQuery, (err, res) => {
        response.send({
            supplierData: res.rows
        });
    });
});

app.get("/deleteSupplier", (request, response) => {
    let deleteSupplierQuery = {
        name: 'delete-supplier-info',
        text: "select * from delete_supplier($1)",
        values: [parseInt(request.query.sid)]
    };

    client.query(deleteSupplierQuery, (err, res) => {
        console.log(res);
        response.send({
            supplierData: res
        });
    });
});

app.get("/getAllSupplierNoVisibilityCheck", (request, response) => {
    let addSupplierQuery = {
        name: 'get-all-suppliers-no-visibility',
        text: "select * from get_all_suppliers_no_visibility()",
        // values:[request.query.name,request.query.visible]
    };

    client.query(addSupplierQuery, (err, res) => {
        response.send({
            supplierData: res.rows,
        });
    });
});

app.get("/getSupplierVisibility", (request, response) => {
    let addSupplierQuery = {
        name: 'get-suppliers-visibility',
        text: "select * from get_supplier_visibility($1)",
        values: [parseInt(request.query.id)]
    };

    client.query(addSupplierQuery, (err, res) => {
        response.send({
            supplierData: res.rows
        });
    });
});

app.get("/updateSupplierVisibility", (request, response) => {
    let addSupplierQuery = {
        name: 'update-suppliers-visibility',
        text: "select * from update_supplier_visibility($1 , $2)",
        values: [parseInt(request.query.id), request.query.visible]
    };

    client.query(addSupplierQuery, (err, res) => {
        response.send({
            update_supplier_visibility: res.rows[0].update_supplier_visibility
        });
    });
});

app.get("/manageIngredients", (request, response) => {
    response.render("ingredients", {
        id: request.query.id
    });
});

app.get("/deliverAnOrder", (request, response) => {
    let addSupplierQuery = {
        name: 'deliver-an-order',
        text: "select * from deliver_an_order($1,$2,$3)",
        values: [request.query.oid, parseInt(request.query.iid), parseInt(request.query.iqty)]
    };

    client.query(addSupplierQuery, (err, res) => {
        response.send({
            // supplierData: res.rows
        });
    });
});

app.get("/placeOrderByBaker", (request, response) => {
    let placeOrderBakerQuery = {
        name: 'place-an-order-by-baker',
        text: "select * from update_ingredient_info($1,$2,$3)",
        values: [
            parseInt(request.query.iid),
            parseInt(request.query.sid),
            parseInt(request.query.iqty)
        ]
    };

    client.query(placeOrderBakerQuery, (err, res) => {
        response.send({
            orderPlaceData: res.rows,
        });
    });
});

app.get("/getAllIngredientsForOrder", (request, response) => {
    var ingredientsQuery = {
        name: "fetch-ingredients-for-order",
        text: "select * from get_all_ingredient_for_order ()",
    };
    client.query(ingredientsQuery, (err, res) => {
        response.send({
            ingredientsData: res.rows,
        });
    });
});

/*****************************************************/

// Routes for both customer and baker views
app.get("/getAllIngredients", (request, response) => {
    var ingredientsQuery = {
        name: "fetch-ingredients",
        text: "select * from get_all_ingrediants ()",
    };
    client.query(ingredientsQuery, (err, res) => {
        response.send({
            ingredientsData: res.rows,
        });
    });
});

/*****************************************************/

// Server and Management
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Soaib",
        errorMessage: "Page not found!",
    });
});
