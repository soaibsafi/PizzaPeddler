console.log('Customer js file loaded')

const pizzaSize = document.querySelector('form');

// const weatherForm = document.querySelector('form');
// const search = document.querySelector('input');
// const messageOne = document.querySelector('#message-1');
// const messageTwo = document.querySelector('#message-2');


// pizzaSize.addEventListener('load', (e) => {
//     e.preventDefault()
//     const location = search.value;
//     messageOne.textContent = 'Loading...';
//     messageTwo.textContent = '';
//
//     console.log("hello")
//     // fetch('http://localhost:3000/getPizzaSize').then((response) => {
//     //     response.json().then((data) => {
//     //         if (data.error) {
//     //             messageOne.textContent = data.error
//     //         } else {
//     //             console.log(data)
//     //
//     //             for(var i=0;i<data.length;i++)
//     //             {
//     //                 var opt = new Option(data[i].Bname);
//     //                 $("#op1").append(opt);
//     //             }
//     //         }
//     //     })
//     // })
// })


window.onload = (event) => {
    console.log('page is fully loaded');

        console.log("hello")
    fetch('http://localhost:3000/getPizzaSize').then((response) => {
        response.json().then((data) => {
            console.log(data.pizzaData);
            // if (data.error) {
            //     messageOne.textContent = data.error
            // } else {
            //     messageOne.textContent = data.location
            //     messageOne.textContent = data.forecast
            // }
        })
    })
};
