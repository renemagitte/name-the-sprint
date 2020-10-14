const express = require('express');
const app = new express();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
// const dbConfig = require("./db.config.js");

// const connectionString = 'mongodb+srv://'+dbConfig.dbUserName+':'+dbConfig.dbPassword+'@cluster0.bcgup.gcp.mongodb.net';
const connectionString = 'mongodb+srv://ida:ida123@cluster0.bcgup.gcp.mongodb.net';

app.use("/", express.static(__dirname + "/"));

app.get('/', function(request, response){
    response.sendFile('index.html');
});

app.get("/api/read-from-json-file", (req, res) => {
    fs.readFile('./some-json.json', { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error("Error message: ", err);
            return;
        }
        res.send(data);
    });
})

app.get("/api/random-sprint-name", (req, res) => {
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('misc');
        const collection = db.collection('sprints');
        const cursor = collection.aggregate([{ $sample: { size: 1 } }]);
        cursor.get(function(err, data) {
            res.send(data);
        })

    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || 3000);