require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./db functions/user');
const Exercise = require('./db functions/exercise');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', async(req, res) => {
  res.json(await User.createAndSaveUser(req.body.username));
});

app.get('/api/users', async(req, res) => {
  res.json(await User.findAllUsers(req.body.username));
});

app.post('/api/users/:_id/exercises', async(req, res) => {
  const userInfo = await User.findUser(req.params._id);

  res.json(await Exercise.createAndSaveExercise(req.body, userInfo));
});

app.get('/api/users/:_id/logs', async(req, res) => {
  const userInfo = await User.findUser(req.params._id);

  res.json(await Exercise.createExerciseLog(req.query, userInfo));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
