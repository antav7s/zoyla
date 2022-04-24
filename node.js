const mysql = require('mysql2')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

app.get("/test", (req, res) => {
  res.send("<h1>OK</h1>")
})

app.get("/:name", async (req, res) => {
        const query = "SELECT name, owner, species FROM pet WHERE name = ?";
        pool.query(query, [ req.params.name], (error, results) => {
            if (!results[0]){
            res.json({ status: "Not Found!" });

            } else {
                        res.json(results[0]);
            }
             }
)
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))
