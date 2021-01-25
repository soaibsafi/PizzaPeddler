console.log("Welcome js file loaded");

const bakerBTN = document.querySelector("#bakerBTN");
const customerBTN = document.querySelector("#customerBTN");
const userDiv = document.querySelector("#userDiv");

var userSelectLBL1 = "userSelectLBL";
var userSelect1 ="userSelect";
var userLoginBTN1 = "userLoginBTN";
var breakLN = "breakLN";

function removeView(){
  var userSelectLBL = document.getElementById(userSelectLBL1);
  if (userSelectLBL) userSelectLBL.parentNode.removeChild(userSelectLBL);

  var userSelect = document.getElementById(userSelect1);
  if (userSelect) userSelect.parentNode.removeChild(userSelect);

  var userLoginBTN = document.getElementById(userLoginBTN1);
  if (userLoginBTN) userLoginBTN.parentNode.removeChild(userLoginBTN);

  var breakLN1 = document.getElementById(breakLN);
  if (breakLN1) breakLN1.parentNode.removeChild(breakLN1);
}

bakerBTN.addEventListener("click", () =>{
  removeView();
  fetch("http://localhost:3000/getallbaker").then((response) => {
    response.json().then((data) => {

      var body = userDiv;

      var userLBL = document.createElement("label");
      userLBL.setAttribute("id",userSelectLBL1);
      userLBL.innerText = "Select a baker: ";
      body.appendChild(userLBL);

      var select = document.createElement("select");
      select.name = "userSelect";
      select.id = userSelect1;
      // select.setAttribute("onchange", "userSelect()");

      var option = document.createElement("option");
      option.value = "";
      option.text = "Select one";
      select.appendChild(option);

      for(var i = 0; i < data.userData.length; i++){

        option = document.createElement("option");
        option.value = data.userData[i].b_id;
        option.text = data.userData[i].name;
        select.appendChild(option);
      }
      body.appendChild(select);

      var breaklin = document.createElement("br");
      breaklin.setAttribute("id",breakLN);
      body.appendChild(breaklin);

      var loginBTN = document.createElement("button");
      loginBTN.setAttribute("id",userLoginBTN1);
      loginBTN.innerText = "Login";
      loginBTN.setAttribute("onclick", "loginBaker()");
      body.appendChild(loginBTN);

    })
  })
})



customerBTN.addEventListener("click",() => {
removeView();

  fetch("http://localhost:3000/getallcustomer").then((response) => {
    response.json().then((data) => {

      var body = userDiv;

      var userLBL = document.createElement("label");
      userLBL.setAttribute("id",userSelectLBL1);
      userLBL.innerText = "Select a customer: ";
      body.appendChild(userLBL);

      var select = document.createElement("select");
      select.name = "userSelect";
      select.id = userSelect1;
      // select.setAttribute("onchange", "userSelect()");

      var option = document.createElement("option");
      option.value = "";
      option.text = "Select one";
      select.appendChild(option);

      for(var i = 0; i < data.userData.length; i++){

           option = document.createElement("option");
          option.value = data.userData[i].id;
          option.text = data.userData[i].cname;
         select.appendChild(option);
      }
      body.appendChild(select);

      var breaklin = document.createElement("br");
      breaklin.setAttribute("id",breakLN);
      body.appendChild(breaklin);

      var loginBTN = document.createElement("button");
      loginBTN.setAttribute("id",userLoginBTN1);
      loginBTN.innerText = "Login";
      loginBTN.setAttribute("onclick", "login()");
      body.appendChild(loginBTN);

    })
  })
})


function login(){
  var userid = document.getElementById("userSelect").value;
  window.location.href = "http://localhost:3000/user?id="+userid;
}

function loginBaker(){
  var userid = document.getElementById("userSelect").value;
  window.location.href = "http://localhost:3000/baker?id="+userid;
}
