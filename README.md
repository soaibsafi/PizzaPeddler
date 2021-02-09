# Pizza Peddler

### About

This project is an online pizza ordering application build with PostgreSQL, PL/pgSQL,NodeJS, and Vanilla JS. All the backend logic and functionalities are implemented in Pl/pgSQL. The REST API is used as middleware between PL/pgSQL and the frontend which is made with Vanilla JS.

### Application Architecture

- Frontend (public & templates/views)
- Backend (Recources/Scripts/functions.sql)
- REST API (src)
- Database (Recources/Scripts/table.sql)

### Prerequisites
The following environment is required to run this application.

- NodeJS 12.x or higher with npm.
    - express: ^4.17.1
    - hbs: ^4.1.1
    - nodemon: ^2.0.4
    - pg: ^8.5.1
    - request: ^2.88.2
- PostgreSQL with PL/pgSQL installed. (Recommended 9.5 or higher)

### How to Run
1. Install the required npm packages-
`npm install`
2. Navigate to the `src/app.js` file and initialize the client- 
```
var client = new Client({
    user: <database_user_name>,
    host: <database_host>,
    database: <database_name>,
    password: <user_password>,
    port: <port>,
});
```
Note: Environment variable can be used to initialize the database client.

3. Navigate to the root directory and run-
`node src/app.js`