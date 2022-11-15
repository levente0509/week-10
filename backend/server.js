const { response } = require("express");
const fileUpload = require("express-fileUpload");
const express = require("express");
const { request } = require("http");
const app = express();
const port = 3000;

const path = require("path");

const fs = require("fs");

app.use(express.json()); //kötelező megadni ha json-t postolunk
app.use(fileUpload());

//képet csak form data-val lehet küldeni (kép != string); adatot JSON-nal

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/about", (req, res) => {
  res.send("Hello");
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.post("/upload", (req, res) => {
  //először mindig a kérés, utána a válasz (req, res)
  console.log(req.body);
  fs.writeFile(
    `${__dirname}/data/userdata.json`,
    JSON.stringify(req.body, null, 4),
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      } else {
        res.status(200).send("Ok!");
      }
    }
  );
});

app.post("/upload-image", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded!");
  }
  const picture = req.files.file;
  const picName = req.body.fileName;
  console.log(picName);

  picture.mv(`${__dirname}/data/${picName}.jpg}`, (error) => {
    //mv = move (folders)
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    } else {
      res.status(200).send("Image saved!");
    }
  });
});

/* app.get("/style.css", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/style.css`));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/script.js`));
}); */

app.listen(port, () => {
  console.log(`Server is running at: http://127.0.0.1:${port}`);
});
