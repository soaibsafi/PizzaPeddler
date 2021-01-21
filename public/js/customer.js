console.log('Customer js file loaded')

const pizzaSize = document.querySelector('#display-pizza');

// const weatherForm = document.querySelector('form');
// const search = document.querySelector('input');
// const messageOne = document.querySelector('#message-1');
// const messageTwo = document.querySelector('#message-2');


// pizzaSize.addEventListener('load', (e) => {
//     e.preventDefault()
//     const location = search.value;
//     messageOne.textContent = 'Loading...';
//     messageTwo.textContent = '';

//     console.log("hello")
//     fetch('http://localhost:3000/getPizzaSize').then((response) => {
//         response.json().then((data) => {
//             console.log(data)
//         })
//     })
// })


window.onload = (event) => {
    event.preventDefault();
    console.log('page is fully loaded');

        console.log("hello")
        fetch('http://localhost:3000/getPizzaSize').then((response) => {
        response.json().then((data) => {
            pizzaSize.textContent = data.pizzaData;
            console.log(pizzaSize.textContent)
            console.log(data.pizzaData)
        })
    })
};
