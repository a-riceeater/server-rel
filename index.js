const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const app = express()
app.use(cors({
    origin: "*"
}))

app.get("/downloads", (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "downloads.json"), "utf8"));
    res.send(jsonData.downloads.toString())
})

app.get("/current-version", (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "downloads.json"), "utf8"));
    res.send(jsonData.version)
})

app.post("/update-downloads", (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "downloads.json"), "utf8"));
    jsonData.downloads++;
    fs.writeFileSync(path.join(__dirname, "downloads.json"), JSON.stringify(jsonData))
    res.sendStatus(200)
})

app.listen(80, () => {
    console.log("Listening on port 80")
})