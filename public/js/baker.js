console.log("Customer js file loaded");

const submitBTN = document.querySelector("#submitBTN");
const ingredientsTBL = document.querySelector("#ingredientsTBL");

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