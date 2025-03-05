const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Baza zsynchronizowana");
    })
    .catch((err) => {
        console.log("Błąd synchronizacji bazy: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({message: "To ja SERWER!!!."});
});

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});