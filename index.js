const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config()



const jondb = require('node-json-db')
const db = new jondb.JsonDB(new jondb.Config("./db/flickz-standalone", true, false, '/'))

exports.db = db;

app.use(express.json());
app.use(express.static(path.join(__dirname, './public'), {
    extensions: ['html'],
}));

require('./api/router').router(app);

app.listen(process.env.PORT, () => {
    console.log(`Flickz *:${process.env.PORT}`);
});