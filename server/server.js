const express = require('express');
const mongo = require('mongodb');
const app = express();
const cors = require('cors');
const memoryRouter = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const url = 'mongodb://localhost:27017/MILHOUSE';
const db = mongoose.connect(url);

const Memory = require('./memoryModel');
const User = require('./userModel');
const List = require('./listModel');

app.use(cors());
app.use(fileUpload());

/*memoryRouter.route('/memories/:memoryID').get((req, res) => {
  console.log(req.params);
  Memory.find((error, memories) => {
    if(error){
      return res.send(error);
    }
    return res.json(memories);
  });
});*/

memoryRouter.route('/upload').post((req, res) => {
  console.log('UPLOAD');
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  console.log(req.files.image);

  let image = req.files.image;
  let path = '../src/assets/images/' + image.name;

  image.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

});

memoryRouter.route('/memories').post((req, res) => {
  /*console.log(req.body);
  Memory.find((error, memories) => {
    if(error){
      return res.send(error);
    }
    return res.json(memories);
  }).limit(1);*/
  let num = Number(req.body.number);
  
  console.log('START NUM' + num);
  let query = Memory.find({
    'number': {
      $in: [
        num,
        num - 1,
        num - 2
      ]}
  });

  query.select();

  query.exec(function (err, memories) {
    if (err) return handleError(err);

    if(memories != null){
      console.log(memories);
        return res.json(memories);
      
    }
  });


});

memoryRouter.route('/memories/largest').get((req, res) => {
  
  let query = Memory.findOne().sort('-number');

  query.exec(function (err, largest) {
    if (err) return handleError(err);

    if(largest != null){
      console.log(largest);
        return res.json(largest);
    }
  });


});

memoryRouter.route('/memories/add').post((req, res) => {
  
  console.log(req.body);

  var newMemory = new Memory(req.body);

  newMemory.save(function (err, memory) {
    if (err) return console.error(err);
    console.log(memory.title + " saved to memories.");
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

memoryRouter.route('/users/newuser').post((req, res) => {
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
          return res.json('User already exists.');
      }
      else{
        console.log('NEW USER: NOT TAKEN');
        let newUser = new User();
        newUser.username = uname;
        newUser.password = pword;
        console.log(newUser);
        newUser.save(function (err, user) {
          if (err) return console.error(err);
          console.log(user.username + " saved to memories.");
          return res.json(user);
        });
      }
      //console.log('found: ', users.username, users.password);
    });
 
});

memoryRouter.route('/lists').get((req, res) => {
  
  console.log(req.body);

  var query = List.find();

  query.select();

    query.exec(function (err, lists) {
      if (err) return handleError(err);
      
      if(lists != null){
        return res.json(lists);
      }
      else{
        console.log('NO LISTS FOUND');
        return res.json({'message': 'No Lists Found'});
        }
      });
});

memoryRouter.route('/lists/delete').post((req, res) => {
  
  console.log(req.body);

  /*List.find({ _id: req.body.listID }).remove(
    function(err, doc) {
      if(err){
        console.log(err);
        return res.json({message: "List could not be removed."});
      }else{
        return res.json({message: "List removed"});
      }
    }
  );*/

  List.findByIdAndDelete(req.body.listID, 
    function(err) {
      if(err){
        console.log(err);
        return res.json({message: "List could not be removed."});
      }else{
        return res.json({message: "List removed"});
      }
    }
    );

});

memoryRouter.route('/lists/items').post((req, res) => {
  
  console.log(req.body);

  var query = List.find({ _id: req.body.id});

  query.select();

    query.exec(function (err, items) {
      if (err) return handleError(err);
      
      if(items != null){
        return res.json(items);
      }
      else{
        console.log('NO ITEMS FOUND');
        return res.json({'message': 'No Items Found'});
        }
      });
});

memoryRouter.route('/lists/items/delete').post((req, res) => {
  
  console.log(req.body);

  List.findByIdAndUpdate(req.body.listID,
    {$pull: {items: req.body.item}},
    {safe: true, upsert: true},
    function(err, doc) {
      if(err){
        console.log(err);
        return res.json({message: "Item could not be removed."});
      }else{
        return res.json({message: "Item removed"});
      }
    }
    );

});

memoryRouter.route('/lists/newlist').post((req, res) => {
  //console.log(req);
  console.log(req.body);

  var newList = new List(req.body);

  newList.save(function (err, list) {
    if (err) return console.error(err);
    console.log(list.title + " saved to memories.");
    return res.json(list);
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
