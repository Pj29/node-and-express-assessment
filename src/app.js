const express = require("express");
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");
const app = express();

// all zoos route
app.get('/zoos/all', (req, res) => {
    const { admin } = req.query;
    if (admin === "true") {
        const allZoos = getZoos();
        res.send(`All zoos: ${allZoos.join('; ')}`);
    } else {
        res.send("You do not have access to that route.");
    }
});

// check zip route 
app.get('/check/:zip', validateZip, (req, res) => {
    const { zip } = req.params;
    const zoos = getZoos(zip);
    if (zoos) {
        res.send(`${zip} exists in our records.`);
    } else {
        res.send(`${zip} does not exist in our records.`);
    }
});

// zoos zip route
app.get('/zoos/:zip', validateZip, (req, res) => {
    const { zip } = req.params;
    const zoos = getZoos(zip);
    if (zoos && zoos.length > 0) {
        res.send(`${zip} zoos: ${zoos.join('; ')}`);
    } else if (zoos && zoos.length === 0) {
        res.send(`${zip} has no zoos.`);
    } else {
        res.send(`${zip} does not exist in our records.`);
    }
});

app.use((req, res, next) => {
    res.send("That route could not be found!");
});
module.exports = app;