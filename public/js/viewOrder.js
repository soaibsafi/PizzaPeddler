console.log("Customer js file loaded");

const orderData = document.querySelector("#orderDDL");
const viewOrderBTN = document.querySelector("#viewOrderBTN");
const orderTBL = document.querySelector("#orderTBL");

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
            for (let i = 0; i < data.orderData.length; i++) {
                let opt = new Option(
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

viewOrderBTN.addEventListener("click", () => {
    console.log('view order')
})

function viewOrderTable(oid) {
    console.log(oid)
    fetch("http://localhost:3000/getAllOrderDetails?oid=" + oid).then((orderDetailsResponse) => {
        orderDetailsResponse.json().then((data) => {
            //order_ID.setAttribute("id", data.orderDetailsData[0].oid);
            //var uniqueid = order_ID.id + "_" + pizzaID + "_" + custID + "_" + ingreID


            var body = orderTBL;
            var tbl = document.createElement("table");
            var tblBody = document.createElement("tbody");
            tbl.setAttribute("id", "orderDetailsTable");



            ////Creating cart table
            for (var i = 0; i < data.orderDetailsData.length; i++){
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
                            cellText = document.createTextNode(data.orderDetailsData[i].sqty);
                            break;
                    }

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
            }

            tblBody.appendChild(row);

            tbl.appendChild(tblBody);
            body.appendChild(tbl);

            tbl.setAttribute("border", "1");
        })
    })


}