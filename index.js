//  init app requires block
const express = require ('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const appConfig = require('./config/config');

//  create application
const app = express();

//  setup layout engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//  setup application
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(blogRoutes);

async function start() {
    try {
        //  connect to mongoDB
        await mongoose.connect(appConfig.mongoConnectString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(3000, () => {
            console.log("Server has been started successfully...");
        })
    } catch(e) {
        console.log(e);
    }
}

start();
