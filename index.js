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
    res.send(jsonData.version.toString())
})

app.post("/update-downloads", (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "downloads.json"), "utf8"));
    jsonData.downloads++;
    fs.writeFileSync(path.join(__dirname, "downloads.json"), JSON.stringify(jsonData), (err) => {
        if (err) console.error(err)
    })
    res.sendStatus(200)
})

app.get("/module-length/:module", (req, res) => {
    const location = path.join(__dirname, "modules", req.params.module + ".js");
    if (!fs.existsSync(location)) return res.sendStatus(404);

    res.send(fs.readFileSync(location, "utf8").split("\n").length.toString())
})

app.get("/modules/:module", (req, res) => {
    console.log(`Module ${req.params.module} requested`)
    const location = path.join(__dirname, "modules", req.params.module + ".js");
    if (!fs.existsSync(location)) return res.sendStatus(404);
    
    const file = fs.readFileSync(location, "utf8")
    const lines = file.split("\n")
    
    let i = 0;
    async function w() {
        res.write((i == 0 ? "" : "\n") + lines[i])
        i++;

        if (i == lines.length) return res.end();
        setTimeout(w, Math.floor(Math.random() * (100 - 85) + 85))
    }
    w();
})

app.listen(80, () => {
    console.log("Listening on port 80")
})