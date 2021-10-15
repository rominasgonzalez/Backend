const express = require("expresss");
let moment = require('moment');
const PORT = 3000;
let app = express();

app.use(cors('*'))


app.get("./",(req, res)=>{
    res.send("mi primer servidor con express")
})

app.get("/productos"), async (req, res)=>{

}

app.get("/productosRandom"), async (req, res)=>{
res.json(response)
}