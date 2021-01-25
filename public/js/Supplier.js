console.log("Supplier Loaded");

const newSupNameText = document.querySelector("#newSupNameText");
const visibiltyDLL = document.querySelector("#visibiltyDLL");
const saveNewSuppBTN = document.querySelector("#saveNewSuppBTN");
const supDDL = document.querySelector("#supDDL");
const updatevisibiltyDLL = document.querySelector("#updatevisibiltyDLL");
const updateSuppBTN = document.querySelector("#updateSuppBTN");
const deleteSuppBTN = document.querySelector("#deleteSuppBTN");

window.onload = (event) => {
  event.preventDefault();
  console.log("The supplier page has been loaded");

  fetch("http://localhost:3000/getAllSupplierNoVisibilityCheck").then((checkResponse) => {
    checkResponse.json().then((data) => {

      for (var i = 0; i < data.supplierData.length; i++) {
        var optName = new Option(
          data.supplierData[i].sname,
          data.supplierData[i].sid
        );
        supDDL.append(optName);
      }
    });
  });

}

function onChangeSupplier() {
  var sid = supDDL.value;
  fetch("http://localhost:3000/getSupplierVisibility?id=" + sid).then((checkResponse) => {
    checkResponse.json().then((data) => {
      updatevisibiltyDLL.value = data.supplierData[0].svisible ? "TRUE" : "FALSE";
    });
  })
}

updateSuppBTN.addEventListener("click", (e) => {
  var supID = supDDL.value;
  var visiblity = updatevisibiltyDLL.value;
  var visible = (updatevisibiltyDLL.value == "TRUE");

  if (visiblity) {
    fetch("http://localhost:3000/updateSupplierVisibility?id=" + supID
      + "&visible=" + visible).then((checkResponse) => {
      checkResponse.json().then((data) => {
        if (data.update_supplier_visibility) alert(data.update_supplier_visibility);
        window.location.reload();
      });
    });
  } else {
    alert("Plese select a visibilty for the supplier");
  }
})

saveNewSuppBTN.addEventListener("click", (e) => {
  var name = newSupNameText.value;
  var visibility = (visibiltyDLL.value == 'TRUE');

  if (name) {
    fetch("http://localhost:3000/saveSupplier?name=" + name + "&visible=" + visibility).then((checkResponse) => {
      checkResponse.json().then((data) => {
        if (data.supplierData[0].save_new_supplier) alert(data.supplierData[0].save_new_supplier);
        window.location.reload();
      });
    });
  } else {
    alert("Please supplier name");
  }
})

deleteSuppBTN.addEventListener("click", (e) => {
  var supID = supDDL.value;

  if (supID) {
    fetch("http://localhost:3000/deleteSupplier?sid=" + supID).then((checkResponse) => {
      checkResponse.json().then((data) => {
        if (data.supplierData) alert("Successfully Deleted the supplier.!");
        window.location.reload();
      });
    });
  } else {
    alert("Please select a supplier");
  }
})



