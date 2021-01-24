console.log("Customer js file loaded");

const manageIngredientBTN = document.querySelector("#manageIngredientBTN");
const manageSupplierBTN = document.querySelector("#manageSupplierBTN");
const updateIngredientBTN = document.querySelector("#updateIngredientBTN");
const ingredientsTBL = document.querySelector("#ingredientsTBL");
const updateIngredientsTBL = document.querySelector("#updateIngredientsTBL");
var ingredient_ID = document.createElement("label");
ingredient_ID.setAttribute("id", "")


window.onload = (event) => {
    event.preventDefault();
    console.log("page is fully loaded");
    createIngredientTable();

}

function createIngredientTable() {
    fetch("http://localhost:3000/getAllIngredientsForBaker").then((response) => {
        response.json().then((data) => {
            console.log(data.ingredientsData);

            let ingredientsHeader = data
            let newIngredientData = ingredientsHeader;
            newIngredientData['ingredientsData'].unshift({
                "i_id": -1,
                "i_name": "Name",
                "regional_provinance": "Region",
                "unit_price": "Unit Price €",
                "quantity": "Qty",
                "visibility": "Visibility",
                "total_price": "Total Price€",
                "s_name": "Supplier"
            });
            ingredientsHeader = JSON.stringify(newIngredientData);
            console.log(newIngredientData)

            let body = ingredientsTBL;
            let tbl = document.createElement("table");
            let tblBody = document.createElement("tbody");
            let ingredientsDataLength = data.ingredientsData.length;

            // creating all cells
            for (let i = 0; i < ingredientsDataLength; i++) {
                // creates a table row
                let row = document.createElement("tr");

                for (let j = 0; j < 9; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    let cell = document.createElement("td");

                    let cellText;
                    switch (j) {
                        case 0:
                            cellText = document.createTextNode(
                                data.ingredientsData[i].i_name
                            );
                            break;
                        case 1:
                            cellText = document.createTextNode(data.ingredientsData[i].regional_provinance);
                            break;
                        case 2:
                            cellText = document.createTextNode(data.ingredientsData[i].quantity);
                            break;
                        case 3:
                            cellText = document.createTextNode(data.ingredientsData[i].unit_price);
                            break;
                        case 4:
                            cellText = document.createTextNode(data.ingredientsData[i].total_price);
                            break;
                        case 5:
                            cellText = document.createTextNode(data.ingredientsData[i].visibility);
                            break;
                        case 6:
                            cellText = document.createTextNode(data.ingredientsData[i].s_name);
                            break;
                        case 7:
                            if (i === 0) {
                                continue;
                            }
                            cellText = document.createElement("button");
                            cellText.setAttribute("id", 'Update_'+data.ingredientsData[i].i_id);
                            cellText.setAttribute('onclick', 'UpdateIngredient(this.id)');
                            let btnText = document.createTextNode("Update");
                            cellText.appendChild(btnText);
                            break;
                        case 8:
                            if (i === 0) {
                                continue;
                            }
                            cellText = document.createElement("button");
                            cellText.setAttribute("id", 'Delete_'+data.ingredientsData[i].i_id);
                            cellText.setAttribute('onclick', 'DeleteIngredient(this.id)');
                            let btnDelete = document.createTextNode("Delete");
                            cellText.appendChild(btnDelete);
                            break;

                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }
            // put the <tbody> in the <table>
            tbl.appendChild(tblBody);
            // appends <table> into <body>
            body.appendChild(tbl);
            // sets the border attribute of tbl to 2;
            tbl.setAttribute("border", "2");
        });
    });
}

function UpdateIngredient(ingredientId)
{
    const splitedIngredientId = ingredientId.substring(7);
    fetch("http://localhost:3000/updateIngredientFromBaker?id="+splitedIngredientId).then((response) => {
        response.json().then((data) => {
            console.log(data);

            ingredient_ID.setAttribute("id", data.updateIngredientData[0].i_id);
            console.log(data.updateIngredientData[0].i_id)
            console.log(ingredient_ID)

            let body = updateIngredientsTBL;
            /*let tbl = document.createElement("table");
            let tblBody = document.createElement("tbody");
            let ingredientsDataLength = data.updateIngredientData.length;*/


            let ingredientNameLbl = document.createElement("Label");
            ingredientNameLbl.setAttribute("for",'inamelabel_'+ingredient_ID);
            ingredientNameLbl.innerHTML = "Name: ";
            body.appendChild(ingredientNameLbl);

            let ingredientNameInput = document.createElement('input');
            ingredientNameInput.type = "text";
            ingredientNameInput.setAttribute('id', 'inamedata_'+ingredient_ID);
            ingredientNameInput.value = data.updateIngredientData[0].name;
            body.appendChild(ingredientNameInput)
            let br1 = document.createElement('br')
            body.appendChild(br1)


            let rpNameLbl = document.createElement("Label");
            rpNameLbl.setAttribute("for",'rpname_'+ingredient_ID);
            rpNameLbl.innerHTML = "Regional Provinance: ";
            body.appendChild(rpNameLbl);
            let rpNameInput = document.createElement('input');
            rpNameInput.type = "text";
            rpNameInput.setAttribute('id', 'rpnamedata_'+ingredient_ID);
            rpNameInput.value = data.updateIngredientData[0].rp;
            body.appendChild(rpNameInput)
            let br2 = document.createElement('br')
            body.appendChild(br2)


            let upNameLbl = document.createElement("Label");
            upNameLbl.setAttribute("for",'upname_'+ingredient_ID);
            upNameLbl.innerHTML = "Unit Price: ";
            body.appendChild(upNameLbl);
            let upNameInput = document.createElement('input');
            upNameInput.type = "text";
            upNameInput.setAttribute('id', 'upnamedata_'+ingredient_ID);
            upNameInput.value = data.updateIngredientData[0].up;
            body.appendChild(upNameInput)
            let br3 = document.createElement('br')
            body.appendChild(br3)

            let visibilityNameLbl = document.createElement("Label");
            visibilityNameLbl.setAttribute("for",'vname_'+ingredient_ID);
            visibilityNameLbl.innerHTML = "Visibility: ";
            body.appendChild(visibilityNameLbl);

            var values = ["True","False"];

            var visibilityNameDDL = document.createElement("select");
            visibilityNameDDL.name = "Visibility";
            visibilityNameDDL.id = "vnamedata_" + visibilityNameId;
            //visibilityNameDDL.setAttribute("onchange", "ChangeQty(this.id)");

            for (const val of values) {
                var option = document.createElement("option");
                option.value = val;
                option.text = val;

                visibilityNameDDL.appendChild(option);
            }
            body.appendChild(visibilityNameDDL);

            let br4 = document.createElement('br')
            body.appendChild(br4)

            let supNameLbl = document.createElement("Label");
            supNameLbl.setAttribute("for",'sname_'+ingredient_ID);
            supNameLbl.innerHTML = "Supplier: ";
            body.appendChild(supNameLbl);

            var supplierNameDDL = document.createElement("select");
            supplierNameDDL.name = "Supplier";
            supplierNameDDL.id = "snamedata" + ingredient_ID;
            fetch("http://localhost:3000/getAllSupplier").then((response) => {
                response.json().then((data) => {
                    console.log(data.supplierData);
                    for (let i = 0; i < data.supplierData.length; i++) {
                        let opt = new Option(
                            data.supplierData[i].sname,
                            data.supplierData[i].sid
                        );
                        supplierNameDDL.append(opt);
                    }
                });
            });
            body.appendChild(supplierNameDDL);
        });
    });
}

function DeleteIngredient(ingredientId)
{
    console.log(ingredientId)
    let splitedIngredientId = ingredientId.substring(7);
    fetch("http://localhost:3000/deleteIngredientFromBaker?id="+splitedIngredientId).then((response) => {
        response.json().then((data) => {
            const deleteRes = data.deleteIngredientData[0].delete_ingredients;
            if(deleteRes.length > 7){
                alert(deleteRes)
            }
            else{
                //alert("Successfully deleted!");
                if(!alert('Successfully deleted!')){window.location.reload();}

            }
        });
    });

}


updateIngredientBTN.addEventListener("click", (e) => {

let iid = document.querySelector("#updateIngredientBTN");
        //console.log(pizzaDDL.value);
        fetch("http://localhost:3000/updateIngredientFromBaker?id=" + order_ID.id).then((checkResponse) => {
            checkResponse.json().then((data) => {
                //console.log(data)
                alert(data.confirmOrderData[0].add_from_cart_to_order);
            });
        });


});

manageSupplierBTN.addEventListener("click",(e)=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bakerid = urlParams.get('id')

    window.location.href = "http://localhost:3000/manageSuppliers?id="+bakerid;
})


manageIngredientBTN.addEventListener("click",(e)=>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bakerid = urlParams.get('id')
    // debugger;
    window.location.href = "http://localhost:3000/manageIngredients?id="+bakerid;
})
