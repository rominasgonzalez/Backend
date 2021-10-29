require("express-handlebars")
app.engine("hbs", 
handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: dirname + "/views/layouts",
        partialsDir: dirname + "/views/partials/"
    })
);


app.get("/productos", (req, res, next)=>{
    console.log(productos);
    res.render('index', productos);
})
