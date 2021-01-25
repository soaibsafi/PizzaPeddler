console.log("New Ingredient js file loaded");

const supplierData = document.querySelector("#supplierDDL");
const supplierDDLForOrder = document.querySelector("#supplierDDLForOrder");
const ingredientDDLForOrder = document.querySelector("#ingredientDDLForOrder");
const addIngredientBTN = document.querySelector("#newIngredientBTN");
const placeOrderBTN = document.querySelector("#placeOrderBTN");




window.onload = (event) => {
  event.preventDefault();
  console.log("page is fully loaded");
  loadSupplier();
  //createIngredientTable();
  loadIngredientsForOrder();
  loadSuppliersForOrder();

}


function loadIngredientsForOrder()
{
  let body = ingredientDDLForOrder;
  var ingredientDDL = document.createElement("select");
  ingredientDDL.name = "Ingredients";
  ingredientDDL.id = "ingredientsForOrder";
  fetch("http://localhost:3000/getAllIngredientsForOrder").then((response) => {
    response.json().then((data) => {
      console.log(data.ingredientsData);
      for (let i = 0; i < data.ingredientsData.length; i++) {
        let opt = new Option(
          data.ingredientsData[i].ingredientname,
          data.ingredientsData[i].i_id
        );
        ingredientDDL.append(opt);
      }
    });
  });
  body.appendChild(ingredientDDL);
}

function loadSuppliersForOrder()
{
  let body = supplierDDLForOrder;
  var supplierDDLOrder = document.createElement("select");
  supplierDDLOrder.name = "SupplierOrder";
  supplierDDLOrder.id = "supplierdata";
  fetch("http://localhost:3000/getAllSupplier").then((response) => {
    response.json().then((data) => {
      console.log(data.supplierData);
      for (let i = 0; i < data.supplierData.length; i++) {
        let opt = new Option(
          data.supplierData[i].sname,
          data.supplierData[i].sid
        );
        supplierDDLOrder.append(opt);
      }
    });
  });
  body.appendChild(supplierDDLOrder);
}

function loadSupplier() {
  //var supplierNameDDL = document.createElement("select");
  let body = supplierData;
  var supplierDDL = document.createElement("select");
  supplierDDL.name = "Supplier";
  supplierDDL.id = "snamedata";
  fetch("http://localhost:3000/getAllSupplier").then((response) => {
    response.json().then((data) => {
      console.log(data.supplierData);
      for (let i = 0; i < data.supplierData.length; i++) {
        let opt = new Option(
          data.supplierData[i].sname,
          data.supplierData[i].sid
        );
        supplierDDL.append(opt);
      }
    });
  });
  body.appendChild(supplierDDL);
}

//http://localhost:3000/placeOrderByBaker?iid=17&sid=11&qty=50
addIngredientBTN.addEventListener("click", () => {
  let iname = document.querySelector("#inamedata").value;
  let rp = document.querySelector("#rpnamedata").value;
  let up = document.querySelector("#upnamedata").value;
  let qty = document.querySelector("#qtydata").value;
  let visibility = document.querySelector("#visibilitydata").value;
  let sid = document.querySelector("#snamedata").value;
  console.log(sid)
  fetch("http://localhost:3000/addNewIngredient?iname="+iname+"&rp="+rp+"&up="+up+"&qty="+qty+"&visibility="+visibility+"&sid="+sid).then((checkResponse) => {
    checkResponse.json().then((data) => {
      console.log(data.newIngredientData.length)
      if(!alert('Successfully Added!')){window.location.reload();}
    });
  });
})

placeOrderBTN.addEventListener("click", (e)=>{
  console.log("place order")
  let iid = document.querySelector("#ingredientsForOrder").value;
  let sid = document.querySelector("#supplierdata").value;
  let qty = document.querySelector("#QtyDataForOrder").value;

  console.log(iid)
  fetch("http://localhost:3000/placeOrderByBaker?iid="+iid+"&sid="+sid+"&iqty="+qty).then((checkResponse) => {
    checkResponse.json().then((data) => {
      console.log(data.orderPlaceData.length)
      if(!alert('New Ingredient Order Hab been placed!')){window.location.reload();}
    });
  });
})


