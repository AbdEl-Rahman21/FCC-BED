require('dotenv').config();

const cors = require('cors');
const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({dest: './public'});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
