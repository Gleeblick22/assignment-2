const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000","http://localhost:3001"]
};

const db = require("./models");
const contact_controller = require("./controllers/contact.controller");
const phone_controller= require("./controllers/phone.controller");

// const run =async()=>{
//   const contact1= await contact_controller.create({
//     name: "Dhan Pd. Ghale",
//   });
//   const phone1= await phone_controller.create({
//     name: "home",
//     'contactId': 1,
//     number: "1234567890",
//   });
// };

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
}).catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to assignment-2 application." });
});

require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});