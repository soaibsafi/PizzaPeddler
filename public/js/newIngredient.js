console.log("New Ingredient js file loaded");

const supplierData = document.querySelector("#supplierDDL");
const addIngredientBTN = document.querySelector("#newIngredientBTN");


window.onload = (event) => {
    event.preventDefault();
    console.log("page is fully loaded");
    loadSupplier();
    //createIngredientTable();

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


//http://localhost:3000/addNewIngredient?iname=Flour&rp=Bangladesh&up=4.50&qty=10&visibility=True&sid=5
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



