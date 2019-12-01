const express = require('express');
const mongo = require('mongodb');
const app = express();
const cors = require('cors');
const memoryRouter = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const url = 'mongodb://localhost:27017/MILHOUSE';
const db = mongoose.connect(url);

const Memory = require('./memoryModel');
const User = require('./userModel');

app.use(cors());

/*memoryRouter.route('/memories/:memoryID').get((req, res) => {
  console.log(req.params);
  Memory.find((error, memories) => {
    if(error){
      return res.send(error);
    }
    return res.json(memories);
  });
});*/

memoryRouter.route('/memories').get((req, res) => {
  console.log(req.params);
  Memory.find((error, memories) => {
    if(error){
      return res.send(error);
    }
    return res.json(memories);
  });
});

memoryRouter.route('/users').post((req, res) => {
  //console.log(req);
  console.log(req.body);
  let uname = req.body.username;
  let pword = req.body.password;
  var query = User.findOne({ 'username': uname });

  // selecting the `name` and `occupation` fields
  query.select('username password');

  // execute the query at a later time
    query.exec(function (err, users) {
      if (err) return handleError(err);
      
      if(users != null){
        console.log('found: ', users.username, users.password);
        if(pword == users.password){
          return res.json(users);
        }
        else{
          return res.json({'message': 'Invalid username or password.'});
        }
      }
      else{
        console.log('USER NOT FOUND');
        return res.json({'message': 'Invalid username or password'});
      }
      //console.log('found: ', users.username, users.password);
    });
 
});

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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
