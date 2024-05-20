const mysql = require('mysql2');

//There are two ways of connecting with SQL, one is that we set up one connection which we can then use to run queries and we should always close the connection after we done with the query. Downside of this is that we need to re-execute the code to create the connection for every new query.
//Another way is that we can set up the connection pool

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: '12345678',
});

module.exports = pool.promise();

