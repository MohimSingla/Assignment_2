const express = require('express');
const { route } = require('../routes/routes.js');

const app = express();

app.use(routes);

app.listen(3000, (error) => {
    if(error){
        throw new Error("Unable to setup Express server. Please try again later.");
    }
})