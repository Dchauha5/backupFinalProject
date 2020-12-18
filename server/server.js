//Budget API
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const chartDataSchema = require("./models/chart_data_schema");

const bodyParser = require('body-parser');

const port = 3000;
let url = 'mongodb://localhost:27017/personalBudget';

const app = express();
app.use('/', express.static('public'));
app.use(express.json());
app.use(cors());



app.get("/hello", (req, res) => {
    console.log("Hello");
    res.json({
        data: "Hello"
    });
});

app.get("/budget", (req, res) => {
    mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            chartDataSchema.find({}).then(data => {
                res.json(data);
                mongoose.connection.close();
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
});


app.post("/addBudget", (req, res) => {
    console.log("ADDDDDDDDDDD");
    console.log(req.body);
    mongoose.connect(url).then(() => {
        var chartData = {
            title: req.body.title,
            budget: req.body.budget,
        };

        chartDataSchema.insertMany(chartData).then((data) => {
            res.json(data);

            mongoose.connection.close();
        }).catch(connectionError => {
            console.log(connectionError);
        });
    }).catch(connectionError => {
        console.log(connectionError);
    });
})

app.listen(port, () => {
    console.log(`API served  at http://localhost:${port}`);
});