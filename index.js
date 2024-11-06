const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config()



app.use(express.json());
app.use(express.static(path.join(__dirname, './public'), {
    extensions: ['html'],
}));

require('./api/router').router(app);

app.listen(process.env.PORT, () => {
    console.log(`Flickz *:${process.env.PORT}`);
});