const express = require("express")
const fs = require("fs")

const server = express()
const PORT = 8080
const data = fs.readFileSync("./matrix.txt", {encoding: "utf-8"})

server.use(express.text())
server.use(express.json())
server.get("/items", (req, res)=>{
    res.send(data)
})

server.post("/items",  (req, res)=>{
    const createData = req.body
    console.log(createData)
    fs.writeFileSync("./matrix.txt", `\n${createData}`, {flag: "a"})
    const data = fs.readFileSync("./matrix.txt", {encoding: "utf-8"})
    res.send(data)
})

server.put("/items/:name", (req,res)=>{
    const { name } = req.params // send format "3) Neo"
    const rename = req.body.name
    console.log(rename)

    const data = fs.readFileSync("./matrix.txt", {encoding: "utf-8"})
    const newArr = data.split("\n")
    let filteredArr = newArr.map((elem)=>{
        return elem.includes(name) ? elem = rename : elem
    })
    fs.writeFileSync("./matrix.txt", filteredArr.join("\n"))
    res.send(filteredArr)
})

server.listen(PORT)