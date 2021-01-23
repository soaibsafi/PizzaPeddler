const path = require("path");
const { Pool, Client } = require("pg");

const express = require("express");
const hbs = require("hbs");

var client = new Client({
  user: "pbmdb_rw",
  host: "pgsql.hrz.tu-chemnitz.de",
  database: "pbmdb",
  password: "ingah4eiW",
  port: 5432,
});
///client.connect()

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//Setup static directory to serve

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partiaslPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and view location
app.set("view engine", "hbs"); //set the view engine as hadlebars
app.set("views", viewPath);
hbs.registerPartials(partiaslPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Soaib",
  });
});

app.get("/about", (req, res) => {
  res.render("index", {
    title: "About me",
    name: "Soaib",
  });
});
app.get("/help", (req, res) => {
  res.render("index", {
    title: "Help",
    name: "Soaib",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "Please provide a valid address.",
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error: "Please provide a valid address",
          });
        }
        res.send({
          forecast: forecastdata,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

//// Calling user by its id

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


// All About baker
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

app.get("/saveIngredientsInCart",(request,response) => {
  var saveInCartQuery = {
    name: "save-ingredient-in-cart",
    text: "select * from t_save_order_in_cart($1,$2,$3,$4,$5,$6)",
    values:[parseInt(request.query.pid),
      parseInt(request.query.cid),
      parseInt(request.query.ingID),
      request.query.oID,
      parseInt(request.query.qty),
      parseFloat(request.query.price)]
  };

  client.query(saveInCartQuery, (err, res) => {
    response.send({
      cartData: res.rows,
    });
  });
})


// Server
app.get("/getIngredientInfo", (request, response) => {

  var ingredientsQuery = {
    name: "fetch-one-ingredient-info",
    text: "select * from get_ingrediant($1)",
    values:[parseInt(request.query.id)]
  };
  client.query(ingredientsQuery, (err, res) => {
    response.send({
      ingredientData: res.rows,
    });
  });
});

app.get("/updatePizzaId", (request, response) => {
    var pizzaIdUpdateQuery = {
    name: "update-pizza-id-cart",
    text: "select * from update_pizza_id($1,$2)",
    values:[parseInt(request.query.pid),
      request.query.oid]
  };
  client.query(pizzaIdUpdateQuery, (err, res) => {
    console.log(res)
    response.send({
      updateData: res
    });
  });
});

app.get("/removeIngredientsFromCart", (request, response) => {
  var pizzaIdUpdateQuery = {
    name: "remove-ingredients-from-cart",
    text: "select * from remove_item_from_cart($1,$2,$3,$4)",
    values:[request.query.oid,
      parseInt(request.query.pid),
      parseInt(request.query.iid),
      parseInt(request.query.cid)
      ]
  };
  client.query(pizzaIdUpdateQuery, (err, res) => {
    console.log(res)
    response.send({
      removedData: res
    });
  });
});


app.get("/updateIngredientQtyinCart", (request, response) => {
  var ingerdientQtyQuery = {
    name: "update-ingredient-qty-incart",
    text: "select * from test_i($1,$2,$3,$4,$5)",
    values:[parseInt(request.query.pid),
      parseInt(request.query.cid),
      parseInt(request.query.iid),
      request.query.oid,
      parseInt(request.query.qty)
    ]
  };
  client.query(ingerdientQtyQuery, (err, res) => {
    console.log(res)
    response.send({
      updateData: res
    });
  });
});



app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Soaib",
    errorMessage: "Help articles not found!",
  });
});

// Need to be at last.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Soaib",
    errorMessage: "Page not found!",
  });
});

/*
app.get('', (req, res)=> {
    res.send('Hello Express');
});

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About page')
}) */
