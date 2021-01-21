console.log('Customer js file loaded')

const pizzaSize = document.querySelector('form');
const pizzaDDL = document.querySelector('#pizzaDDL');
const submitBTN = document.querySelector('#submitBTN');
const ingredientsTBL = document.querySelector('#ingredientsTBL');

window.onload = (event) => {
    event.preventDefault();
    console.log('page is fully loaded');
    fetch('http://localhost:3000/getPizzaSize').then((response) => {
        response.json().then((data) => {
          // console.log(data.pizzaData);
            for(var i=0;i<data.pizzaData.length;i++)
            {
                var opt = new Option(data.pizzaData[i].pizzaname, data.pizzaData[i].p_id);
                pizzaDDL.append(opt);
            }
        })
    })

    fetch('http://localhost:3000/getAllIngredients').then((response) => {
        response.json().then((data) => {
             console.log(data.ingredientsData);

            var body = ingredientsTBL;
            var tbl = document.createElement("table");
            var tblBody = document.createElement("tbody");

            // creating all cells
            for (var i = 0; i < 2; i++) {
                // creates a table row
                var row = document.createElement("tr");

                for (var j = 0; j < 2; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode("cell in row "+i+", column "+j);
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

        })
    })
};

submitBTN.addEventListener("click",(e) => {
    console.log('the ddl value and text');
    console.log(pizzaDDL.value);
})

