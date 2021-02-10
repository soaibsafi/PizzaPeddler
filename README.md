# Pizza Peddler

### About

This project is an online pizza ordering application build with PostgreSQL, PL/pgSQL,NodeJS, and Vanilla JS. All the backend logic and functionalities are implemented in Pl/pgSQL. The REST API is used as middleware between PL/pgSQL and the frontend which is made with Vanilla JS.

### Application Architecture

- Frontend (public & templates/views)
- Backend (Recources/Scripts/functions.sql)
- REST API (src)
- Database (Recources/Scripts/)

### Prerequisites
The following environment is required to run this application.

- PostgreSQL with PL/pgSQL installed. (Recommended pgAdmin)
- NodeJS 12.x or higher with npm.
    - express: ^4.17.1
    - hbs: ^4.1.1
    - nodemon: ^2.0.4
    - pg: ^8.5.1
    - request: ^2.88.2


### How to Run
1. Create a database in PostgreSQL from `pgAdmin`-

`CREATE DATABASE <db_name>`

2. Navigate to the `src/app.js` file and initialize the client with the database details- 
```
var client = new Client({
    user: <database_user_name>,
    host: <database_host>,
    database: <database_name>,
    password: <user_password>,
    port: <port>,
});
```
Note: Default port is `5432`. The port can be found using following query-
`SELECT * FROM pg_settings WHERE name = 'port';`

3. From the taskbar of the `pgAdmin` open `SQL` and load & execure the following `.sql` files-
    - `Recources/Scripts/table.sql`
    - `Recources/Scripts/function.sql`


4. Install the required npm packages-

`npm install`

5. Navigate to the root directory and run-

`node src/app.js`