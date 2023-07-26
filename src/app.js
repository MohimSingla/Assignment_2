const express = require('express');
const { routes } = require('../routes/routes.js');

const app = express();

app.use(express.json())
app.use(routes);

app.listen(3000, (error) => {
    if(error){
        throw new Error("Unable to setup Express server. Please try again later.");
    }
})