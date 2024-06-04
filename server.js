import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const __dirname = path.resolve(); //behövs för ES6
const PORT = 3005;

app.set("view engine", "ejs");
app.use(express.static("public"));

// const flowers = ["Daffodil", "Dandelion", "Sunflower"];

const superheros = JSON.parse(fs.readFileSync("./public/data/superheros.json"));

// // upg 1
// app.get("/", (req, res) => {
//   res.status(200).render("index", { title: "Hello embedded javascript" });
// });

// // upg 2
// app.get("/flowers", (req, res) => {
//   res.status(200).render("flowers", { flowerData: flowers });
// });

//upg 3 (statiska filer)
app.get("/", (req, res) => {
  res.status(200).sendFile("./public/pages/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.status(200).sendFile("./public/pages/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.status(200).sendFile("./public/pages/contact.html", { root: __dirname });
});

app.get("/superheros", (req, res) => {
  res.status(200).render("superheros", { superheros: superheros });
});

app.get("/superheros/:id", (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).render("superheroDetails", {
    heroName: superheros[id].heroName,
    imageHero: superheros[id].image,
    firstName: superheros[id].firstName,
    lastName: superheros[id].lastName,
    description: superheros[id].description,
  });
});

app.listen(PORT, () => {
  console.log(`Port is running on port: ${PORT} http://localhost:${PORT}`);
});
