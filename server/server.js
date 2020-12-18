//Budget API
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const chartDataSchema = require("./models/chart_data_schema");
const UserSchema = require("./models/UserSchema");

const bodyParser = require('body-parser');

const port = 3000;
let url = 'mongodb://localhost:27017/personalBudget';

const app = express();
app.use('/', express.static('public'));
app.use(express.json());
app.use(cors());



app.post("/user/valid", (req, res) => {
  mongoose.connect(url).then(() => {
      var user = {
          email: req.body.email,
          password: req.body.password,
      };
      console.log(user);
    UserSchema.find({
                email: user.email,
                password : user.password
            }, function (err, docs) {
             if (docs.length) {
                 res.json("true")
                 return 1;
             } else {
                 res.json("false")
                return 0;
             }
         })
     .catch(connectionError => {
          console.log(connectionError);
      });
  }).catch(connectionError => {
      console.log(connectionError);
  });

});

app.post("/new/user",(req,res) =>{
    console.log("req",req.body);
    mongoose.connect(url).then(() => {
        var user = {
            email: req.body.email,
            password: req.body.password,
        };
        UserSchema.insertMany(user).then((data) => {
            res.json(data);
            mongoose.connection.close();
        }).catch(connectionError => {
            console.log(connectionError);
        });
        
    }).catch(connectionError => {
        console.log(connectionError);
    });

})

app.delete("/remove/budget", (req, res) => {
    console.log("EXE");
    mongoose.connect(url).then(() => {
    chartDataSchema.deleteMany({}).then(
        res.json("done")
    )
        .catch(connectionError => {
            console.log(connectionError);
        });
    })
})


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


app.post("/new/budget", (req, res) => {
    
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