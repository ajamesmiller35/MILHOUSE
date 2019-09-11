const express = require('express');
const mongo = require('mongodb');

const app = express();
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';

var collections;

app.listen(3000, () => {
  console.log( 'server started' );

console.log('querytest START!');

MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true }, (err, client) => {

    if (err) throw err;

    const db = client.db("milhouse");

    db.listCollections().toArray().then((docs) => {

        console.log('Available collections:');
        docs.forEach((doc, idx, array) => { console.log(doc.name) });
        collections = docs;

    }).catch((err) => {

        console.log(err);
    }).finally(() => {

        client.close();
    });
});

app.route('/collections').get((req, res) => {
  res.send({
    collections: [{ collections }],
  })
})

})
