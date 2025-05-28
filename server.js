const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongodb.MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  const db = client.db('mydb');
  const collection = db.collection('users');

  app.post('/submit-form', (req, res) => {
    const { name, department, addr } = req.body;
    collection.insertOne({ name, department, addr }, (err, result) => {
      if (err) {
        return res.status(500).send('Error storing form data');
      }
      return res.send('Form data successfully stored in database');
    });
  });

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
