console.log("Customer js file loaded");

const pizzaDDL = document.querySelector("#pizzaDDL");
const submitBTN = document.querySelector("#submitBTN");
const ingredientsTBL = document.querySelector("#ingredientsTBL");
const orderCartTBL = document.querySelector("#orderCartTBL");
const totalPriceAmountLBL = document.querySelector("#totalPriceAmountLBL");

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
    var totalPrice = parseFloat(document.getElementById('totalPriceAmountLBL').innerText);

    fetch("http://localhost:3000/getIngredientInfo?id=" + ingredientID).then((response) => {
        response.json().then((data) => {

            console.log(totalPrice);
            totalPrice = (totalPrice ? totalPrice : 0 ) + (1 * parseFloat(data.ingredientData[0].price));
            var body = orderCartTBL;
            var tbl = document.createElement("table");
            var tblBody = document.createElement("tbody");


            var row = document.createElement("tr");

            for (var j = 0; j < 3; j++) {
                var cell = document.createElement("td");
                var cellText;

                switch (j) {
                    case 0:
                        cellText = document.createTextNode(data.ingredientData[0].i_name);
                        break;
                    case 1:
                        cellText = document.createTextNode(data.ingredientData[0].price);
                        break;
                    case 2:
                        var values = ["1","2","3"];

                        cellText = document.createElement("select");
                        cellText.name = "Quantity";
                        cellText.id = "Quantity";
                        cellText.onchange = "UpdateTotalPrice()";


                        for (const val of values) {
                            var option = document.createElement("option");
                            option.value = val;
                            option.text = val;

                            cellText.appendChild(option);
                        }

                        break;
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);

            tbl.appendChild(tblBody);
            body.appendChild(tbl);

            tbl.setAttribute("border", "1");

            totalPriceAmountLBL.innerHTML = totalPrice;
        });
    });

}

function UpdateTotalPrice(){
    var myVar = document.getElementById('Quantity').value;

    console.log(myVar);
}

submitBTN.addEventListener("click", (e) => {
    console.log(pizzaDDL.value);

});


// document.querySelector("#ingredients-add").addEventListener("click",(e)=>{
//     console.log("I am clicking on the add button");
// });

