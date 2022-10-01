const Pool = require('pg').Pool

const pool = new Pool({
    user: "ajzanaalieva",
    password: "123456",
    host: "localhost",
    port: 3000,
    database: "ajzanaalieva"
});
module.exports = pool