//  init app requires block
const express = require ('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const appConfig = require('./config/config');
const routes = require('./routes/routes');
const path = require('path')

//  create application
const app = express();

//  setup layout engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

//  setup application
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//  use block
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

async function start() {
    try {
        //  connect to mongoDB
        await mongoose.connect(appConfig.mongoConnectString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(appConfig.port, () => {
            console.log("Server has been started successfully...");
        })
    } catch(e) {
        console.log(e);
    }
}

start();
