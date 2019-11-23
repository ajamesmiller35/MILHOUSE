const express = require('express');
const mongo = require('mongodb');
const app = express();
const memoryRouter = express.Router();
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/MILHOUSE';
const db = mongoose.connect(url);

const Memory = require('./memoryModel');

memoryRouter.route('/memories/:memoryID').get((req, res) => {
  console.log(req.params);
  Memory.find((error, memories) => {
    if(error){
      return res.send(error);
    }
    return res.json(memories);
  });
});

app.use('/api', memoryRouter);

app.listen(3000, () => {
  console.log( 'server started' );

{/*MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true }, (err, client) => {

    if (err) throw err;

    const db = client.db("MILHOUSE");

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
  console.log(req.params);
  res.send({
    collections: [{ collections }],
  })
})*/}



});
