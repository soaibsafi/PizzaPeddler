console.log("Customer js file loaded");

const orderData = document.querySelector("#orderDDL");
const orderTBL = document.querySelector("#orderTBL");
const deliverBTN = document.querySelector("#deliverBTN");
var isOutStock = false;

window.onload = (event) => {
    event.preventDefault();
    console.log("page is fully loaded");
    viewOrderDropDown();
}

function viewOrderDropDown() {
    let body = orderData;
    var orderDDL = document.createElement("select");
    orderDDL.name = "order";
    orderDDL.id = "orderid";

    fetch("http://localhost:3000/getAllOrder").then((response) => {
        response.json().then((data) => {
            console.log(data.orderData);
           var  opt = new Option(
                "Select An order",
                ""
            );

            orderDDL.append(opt);

            for (let i = 0; i < data.orderData.length; i++) {
                 opt = new Option(
                    data.orderData[i].oid,
                    data.orderData[i].oid
                );
                orderDDL.append(opt);
            }
            orderDDL.setAttribute("onchange", "viewOrderTable(document.getElementById(\"orderid\").value)");
        });

    });
    body.appendChild(orderDDL);
}

function viewOrderTable(oid) {

    debugger;
    var table = document.getElementById("OrderDetailsTBL");
    var customerNameLBL = document.getElementById("customerNameLBL");
    var pizzaNameLBL = document.getElementById("pizzaNameLBL");
    isOutStock = false;

    if(table) {
        table.parentNode.removeChild(table);
        customerNameLBL.parentNode.removeChild(customerNameLBL);
        pizzaNameLBL.parentNode.removeChild(pizzaNameLBL);

    }
    if(oid)
    fetch("http://localhost:3000/getAllOrderDetails?oid=" + oid).then((orderDetailsResponse) => {
        orderDetailsResponse.json().then((data) => {

            var customerNameLBL = document.createElement("label");
            customerNameLBL.setAttribute("id","customerNameLBL");
            customerNameLBL.innerText = "This order is for : "+data.orderDetailsData[0].cname;
            document.querySelector("#divCustomarLBL").appendChild(customerNameLBL);

            var pizzaNameLBL = document.createElement("label");
            pizzaNameLBL.setAttribute("id","pizzaNameLBL")
            pizzaNameLBL.innerText = "Pizza size is : "+data.orderDetailsData[0].pname;
            document.querySelector("#divPizzaNameLBL").appendChild(pizzaNameLBL);


            var body = orderTBL;
            var tbl = document.createElement("table");
            tbl.setAttribute("id","OrderDetailsTBL")
            var tblBody = document.createElement("tbody");
            var ingredientsDataLength = data.orderDetailsData.length;

            for (var i = 0; i < ingredientsDataLength; i++) {
                var row = document.createElement("tr");

                for (var j = 0; j < 3; j++) {
                    var cell = document.createElement("td");

                    var cellText;
                    switch (j) {
                        case 0:
                            cellText = document.createTextNode(data.orderDetailsData[i].iname);
                            break;
                        case 1:
                            cellText = document.createTextNode(data.orderDetailsData[i].oqty);
                            break;
                        case 2:
                          //  if(parseInt(data.orderDetailsData[i].oqty) > parseInt(data.orderDetailsData[i].sqty)){
                            if(data.orderDetailsData[i].status === "Out of Stock"){
                                isOutStock = true;
                            }

                            cellText = document.createTextNode(data.orderDetailsData[i].status);
                            break;
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                tblBody.appendChild(row);
            }
            tbl.appendChild(tblBody);
            body.appendChild(tbl);
            tbl.setAttribute("border", "1");
        })
    })
    else alert ("Please select an order")
}
deliverBTN.addEventListener("click",(e) => {
    console.log("I am from deliver");
    var oid =  orderid.value;


    if(oid && (!isOutStock)){
        fetch("http://localhost:3000/getAllOrderDetails?oid=" + oid).then((checkResponse) => {
            checkResponse.json().then((data) => {

                for(var i = 0; i < data.orderDetailsData.length; i++){
                    var iid = data.orderDetailsData[i].iid;
                    var oqty = data.orderDetailsData[i].oqty;
                    var oid = data.orderDetailsData[i].oid;

                    fetch("http://localhost:3000/deliverAnOrder?oid=" + oid +"&iid="+iid+"&iqty="+oqty).then((deliverResponse) => {
                        deliverResponse.json().then((data) => {
                            var table = document.getElementById("OrderDetailsTBL");
                            var customerNameLBL = document.getElementById("customerNameLBL");
                            var pizzaNameLBL = document.getElementById("pizzaNameLBL");

                            if(table) table.parentNode.removeChild(table);
                            if(customerNameLBL)customerNameLBL.parentNode.removeChild(customerNameLBL);
                            if(pizzaNameLBL)pizzaNameLBL.parentNode.removeChild(pizzaNameLBL);

                            isOutStock = false;
                            window.location.reload();
                        });
                    })

                }
            });
        });
    }
    else{
       if(!oid) alert("Please select an order");
       else alert("One or more ingredients are out of stock");
    }

})
