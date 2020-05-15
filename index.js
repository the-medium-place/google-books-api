const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
// var exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3001


const db = require("./models");

const app = express();
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks_db", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(cors({
    origin:["https://pacific-earth-75465.herokuapp.com/"]
}));

app.get("/", (req, res) => {
    res.send("API splash!")
})

app.get("/api/favbooks", (req,res) => {
    console.log('received request')

    db.FavBook.find({})
    .then(dbWorkout => {   

        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});



app.post("/api/favbooks", ({ body }, res) => {
    console.log(body.volumeInfo.title);
    console.log(body.volumeInfo);
    const newObj = {
        title: body.volumeInfo.title,
        subTitle: body.volumeInfo.subtitle,
        authors: body.volumeInfo.authors,
        infoLink: body.volumeInfo.infoLink,
        description: body.volumeInfo.description,
        imgURL: body.volumeInfo.imageLinks.thumbnail,
        bookID: body.id
       
    }
    db.FavBook.create(newObj)
        .then(dbfavbook => {
            res.send(dbfavbook);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})



app.delete("/api/favbooks/:id", ({ params }, res) => {
    db.FavBook.findByIdAndDelete(params.id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      })
      .then(dbFavBook => {
          res.send(dbFavBook)
        })
      .catch(err=> {
          console.log(err);
          res.send(err);
      });
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
