const db = require("../db")

//подключаемся к бд

class UserController {

    async getRows(req, res) {
        const allRows = await db.query(`SELECT * from wellbex`)
        res.json(allRows.rows)
    }

}
module.exports = new UserController();

