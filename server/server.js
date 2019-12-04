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

//Handles upload of image files
memoryRouter.route('/upload').post((req, res) => {
  console.log('UPLOAD');
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log(req.files.image);

  let image = req.files.image;

  //path to save image files to
  let path = '../src/assets/images/' + image.name;

  image.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

});

//Retrieves memories three at a time
memoryRouter.route('/memories').post((req, res) => {

  console.log(req.body);

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

//Finds the number of the largest memory. This is important for retrieving all memories in the correct order.
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

//adds memories to database
memoryRouter.route('/memories/add').post((req, res) => {

  console.log(req.body);

  var newMemory = new Memory(req.body);

  newMemory.save(function (err, memory) {
    if (err) return console.error(err);
    console.log(memory.title + " saved to memories.");
  });

});

//checks if username and password matches a user in the database
memoryRouter.route('/users').post((req, res) => {

  console.log(req.body);

  let uname = req.body.username;
  let pword = req.body.password;
  var query = User.findOne({ 'username': uname });

  console.log(uname);
  console.log(pword);

  query.select('username password');

    query.exec(function (err, users) {
      if (err) return handleError(err);

      console.log(users);

      if(users != null){
        console.log('found: ', users);
        if(pword == users.password){
          return res.json({ _id: users._id, username: users.username, status: 'valid'});
        }
        else{
          return res.json({ _id: "invalid", username: "invalid", status: 'invalid'});
        }
      }
      else{
        console.log('USER NOT FOUND');
        return res.json({ _id: "invalid", username: "invalid", status: 'invalid'});
      }
    });

});

//add a user to the database
memoryRouter.route('/users/newuser').post((req, res) => {

  console.log(req.body);

  let uname = req.body.username;
  let pword = req.body.password;
  var query = User.findOne({ 'username': uname });

  query.select('username password');

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
    });

});

//retrieves all lists from the database
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

//deletes an entire list from the database
memoryRouter.route('/lists/delete').post((req, res) => {

  console.log(req.body);

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

//updates the items in a list
memoryRouter.route('/lists/update').post((req, res) => {

  console.log(req.body);

  List.findByIdAndUpdate(req.body.listID, {$set: {items: req.body.list}},
    function(err) {
      if(err){
        console.log(err);
        return res.json({message: "List could not be update."});
      }else{
        return res.json({message: "List updated"});
      }
    }
    );

});

//retrieves the items from a list
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

//deletes an individual item from a list
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

//create a new list in the database
memoryRouter.route('/lists/newlist').post((req, res) => {

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

});
