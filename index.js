const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
require("dotenv").config();

const app = express()
app.use(cors({
    origin: "*"
}))

app.get("/downloads", (req, res) => {
    res.send(process.env.downloads.toString())
})

app.get("/current-version", (req, res) => {
    res.send(process.env.version.toString())
})

app.post("/update-downloads", (req, res) => {
    let downloads = parseInt(process.env.downloads);
    downloads++;
    process.env.downloads = downloads;

    res.sendStatus(200)
})

app.listen(80, () => {
    console.log("Listening on port 80")
})