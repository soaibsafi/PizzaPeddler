console.log("Welcome js file loaded");

const bakerBTN = document.querySelector("#bakerBTN");
const customerBTN = document.querySelector("#customerBTN");
const userDiv = document.querySelector("#userDiv");

var userSelectLBL = "userSelectLBL";
var userSelect ="userSelect";
var userLoginBTN = "userLoginBTN";


bakerBTN.addEventListener("click", () =>{



  fetch("http://localhost:3000/getallbaker").then((response) => {
    response.json().then((data) => {

      var body = userDiv;

      var userLBL = document.createElement("label");
      userLBL.setAttribute("id","userSelectLBL");
      userLBL.innerText = "Select a baker: ";
      body.appendChild(userLBL);

      var select = document.createElement("select");
      select.name = "userSelect";
      select.id = "userSelect";
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
      body.appendChild(breaklin);

      var loginBTN = document.createElement("button");
      loginBTN.setAttribute("id","userLoginBTN");
      loginBTN.innerText = "Login";
      loginBTN.setAttribute("onclick", "loginBaker()");
      body.appendChild(loginBTN);

    })
  })
})



customerBTN.addEventListener("click",() => {

  fetch("http://localhost:3000/getallcustomer").then((response) => {
    response.json().then((data) => {

      var body = userDiv;

      var userLBL = document.createElement("label");
      userLBL.setAttribute("id","userSelectLBL");
      userLBL.innerText = "Select a customer: ";
      body.appendChild(userLBL);

      var select = document.createElement("select");
      select.name = "userSelect";
      select.id = "userSelect";
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
      body.appendChild(breaklin);

      var loginBTN = document.createElement("button");
      loginBTN.setAttribute("id","userSelectLBL");
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
