const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

app.get("/downloads", (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "downloads.json"), "utf8"));
    res.send(jsonData.downloads.toString())
})

app.post("/update-downloads", (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "downloads.json"), "utf8"));
    jsonData.downloads++;
    fs.writeFile(path.join(__dirname, "downloads.json", ), JSON.stringify(jsonData), "utf8", (err) => {
        res.status(200);
    })
})

app.listen(80, () => {
    console.log("Listening on port 80")
})