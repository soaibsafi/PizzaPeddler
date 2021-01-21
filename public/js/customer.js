console.log('Customer js file loaded')

const pizzaSize = document.querySelector('form');
const pizzaDDL = document.querySelector('#pizzaDDL');
const submitBTN = document.querySelector('#submitBTN');

window.onload = (event) => {
    event.preventDefault();
    console.log('page is fully loaded');
    fetch('http://localhost:3000/pizza').then((response) => {
        response.json().then((data) => {
          // console.log(data.pizzaData);

            for(var i=0;i<data.pizzaData.length;i++)
            {
                var opt = new Option(data.pizzaData[i].pizzaname, data.pizzaData[i].p_id);
                pizzaDDL.append(opt);
            }
        })
    })
};

submitBTN.addEventListener("click",(e) => {
    console.log('the ddl value and text');
    console.log(pizzaDDL.value);
})

