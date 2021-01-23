console.log("Customer js file loaded");

const pizzaDDL = document.querySelector("#pizzaDDL");
const confirmOrderBtn = document.querySelector("#confirmOrderBtn");
const ingredientsTBL = document.querySelector("#ingredientsTBL");
const orderCartTBL = document.querySelector("#orderCartTBL");
const totalPriceAmountLBL = document.querySelector("#totalPriceAmountLBL");
var order_ID = document.createElement("label");
order_ID.setAttribute("id", "")  //track order id


window.onload = (event) => {
  event.preventDefault();
  console.log("page is fully loaded");
  fetch("http://localhost:3000/getPizzaSize").then((response) => {
    response.json().then((data) => {
      // console.log(data.pizzaData);
      for (var i = 0; i < data.pizzaData.length; i++) {
        var opt = new Option(
            data.pizzaData[i].pizzaname,
            data.pizzaData[i].p_id
        );
        pizzaDDL.append(opt);
      }
    });
  });

  fetch("http://localhost:3000/getAllIngredients").then((response) => {
    response.json().then((data) => {

      //console.log(data.ingredientsData);


      var body = ingredientsTBL;
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var ingredientsDataLength = data.ingredientsData.length;

      for (var i = 0; i < ingredientsDataLength; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < 3; j++) {
          var cell = document.createElement("td");

          var cellText;
          switch (j) {
            case 0:
              cellText = document.createTextNode(
                  data.ingredientsData[i].i_name
              );
              break;
            case 1:
              cellText = document.createTextNode(data.ingredientsData[i].price);
              break;
            case 2:
              cellText = document.createElement("button");
              cellText.setAttribute("id", data.ingredientsData[i].i_id);
              cellText.setAttribute('onclick', 'AddIngredients(this.id)');
              var btnText = document.createTextNode("Add");
              cellText.appendChild(btnText);
              break;
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        tblBody.appendChild(row);
      }

      tbl.appendChild(tblBody);
      body.appendChild(tbl);
      tbl.setAttribute("border", "2");
    });
  });
};

function AddIngredients(ingredientID) {
  var totalPrice = 0;

  if (pizzaDDL.value)
    fetch("http://localhost:3000/getIngredientInfo?id=" + ingredientID).then((response) => {
      response.json().then((data) => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const customerId = urlParams.get('id')
        /// console.log(customerId);

        var pizzaID = pizzaDDL.value;
        var custID = customerId;
        var ingreID = ingredientID;
        var orderID = order_ID.id ? order_ID.id : '';
        var qty = 1;
        var price = data.ingredientData[0].price;

        fetch("http://localhost:3000/checkDuplicateIngredientsInCart?oid=" + orderID + "&iID=" + ingreID + "&cid=" + custID).then((checkResponse) => {
          checkResponse.json().then((data) => {

            // console.log(data);

            if (data.checkIngredientsData[0].check_ingredient_in_cart.length) {
              alert(data.checkIngredientsData[0].check_ingredient_in_cart)

            } else {
              fetch("http://localhost:3000/saveIngredientsInCart?pid=" + pizzaID + "&cid=" + custID + "&ingID=" + ingreID + "&oID=" + orderID + "&qty=" + qty + "&price=" + price).then((savedIngredientResponse) => {
                savedIngredientResponse.json().then((data) => {
                  order_ID.setAttribute("id", data.cartData[0].o_id);

                  var uniqueid = order_ID.id + "_" + pizzaID + "_" + custID + "_" + ingreID

                  totalPrice = data.cartData[0].totalprice;

                  var body = orderCartTBL;
                  var tbl = document.createElement("table");
                  var tblBody = document.createElement("tbody");
                  tbl.setAttribute("id", uniqueid);

                  var row = document.createElement("tr");

                  ////Creating cart table
                  for (var j = 0; j < 4; j++) {
                    var cell = document.createElement("td");
                    var cellText;

                    switch (j) {
                      case 0:
                        cellText = document.createTextNode(data.cartData[0].i_name);
                        break;
                      case 1:
                        cellText = document.createTextNode(data.cartData[0].unit_price);
                        break;
                      case 2:
                        var values = ["1", "2", "3"];

                        cellText = document.createElement("select");
                        cellText.name = "Quantity";
                        cellText.id = "Quantity_" + uniqueid;
                        cellText.setAttribute("onchange", "ChangeQty(this.id)");

                        for (const val of values) {
                          var option = document.createElement("option");
                          option.value = val;
                          option.text = val;

                          cellText.appendChild(option);
                        }
                        break;
                      case 3:
                        cellText = document.createElement("button");
                        cellText.setAttribute("id", "remove_" + uniqueid)
                        cellText.setAttribute("onclick", "Removerow(this.id)");
                        var btnText = document.createTextNode("X");
                        cellText.appendChild(btnText);
                    }

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                  }
                  tblBody.appendChild(row);

                  tbl.appendChild(tblBody);
                  body.appendChild(tbl);

                  tbl.setAttribute("border", "1");

                  totalPriceAmountLBL.innerHTML = totalPrice;
                })
              })

            }
          });
        });


      });
    });
  else alert("Please select a pizza size")
}

function ChangeQty(id) {
  var qty = document.getElementById(id).value;

  var ddlID = id.split("_");

  var oid = ddlID[1];
  var pid = pizzaDDL.value;
  var cid = ddlID[3];
  var iid = ddlID[4];

  fetch("http://localhost:3000/updateIngredientQtyinCart?oid=" + oid + "&pid=" + pid + "&iid=" + iid +
      "&cid=" + cid + "&qty=" + qty).then((checkResponse) => {
    checkResponse.json().then((data) => {
      totalPriceAmountLBL.innerHTML = data.updateData[0].update_ingredient_qty;
    });
  });

}

function Removerow(id) {
  var tblID = id.substring(7);

  res = tblID.split("_");

  var oid = res[0];
  var pid = pizzaDDL.value;
  var cid = res[2];
  var iid = res[3];

  fetch("http://localhost:3000/removeIngredientsFromCart?oid=" + oid + "&pid=" + pid + "&iid=" + iid + "&cid=" + cid).then((checkResponse) => {
    checkResponse.json().then((data) => {
      if (data.removedData[0].remove_item_from_cart.length) {
        var tbl = document.getElementById(tblID);
        if (tbl) tbl.parentNode.removeChild(tbl);
        totalPriceAmountLBL.innerHTML = data.removedData[0].remove_item_from_cart;
      }
    });
  });

}

function pizzaSizeChange() {
  var pizzaid = pizzaDDL.value;

  var orderId = order_ID.id;
  if (orderId) {

    fetch("http://localhost:3000/updatePizzaId?oid=" + orderId + "&pid=" + pizzaid).then((checkResponse) => {
      checkResponse.json().then((data) => {
        totalPriceAmountLBL.innerHTML = data.updateData[0].update_pizza_id;
      });
    });
  }
}

function UpdateTotalPrice() {
  var myVar = document.getElementById('Quantity').value;

  console.log(myVar);
}

confirmOrderBtn.addEventListener("click", (e) => {
  if(order_ID.id){
  //console.log(pizzaDDL.value);
  fetch("http://localhost:3000/confirmOrder?id=" + order_ID.id).then((checkResponse) => {
    checkResponse.json().then((data) => {
      //console.log(data)
      alert(data.confirmOrderData[0].add_from_cart_to_order);
      window.location.reload();
    });
  });
  }
  else{
    alert("You haven't select any ingredient(s).")
  }
});


// document.querySelector("#ingredients-add").addEventListener("click",(e)=>{
//     console.log("I am clicking on the add button");
// });

