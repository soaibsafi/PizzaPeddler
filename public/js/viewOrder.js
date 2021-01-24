console.log("Customer js file loaded");

const orderData = document.querySelector("#orderDDL");
const viewOrderBTN = document.querySelector("#viewOrderBTN");
const orderTBL = document.querySelector("#orderTBL");

window.onload = (event) => {
    event.preventDefault();
    console.log("page is fully loaded");
    viewOrderDropDown();
}

function viewOrderDropDown()
{
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

viewOrderBTN.addEventListener("click", ()=>{
    console.log('view order')
})

function viewOrderTable(oid)
{
    console.log(oid)
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