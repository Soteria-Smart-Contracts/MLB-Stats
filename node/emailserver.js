const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
  next();
});

// Endpoint to handle POST requests
app.post('/submit-data', (req, res) => {
  // Extract data from request body
  const { name, email } = req.body;

  // Do something with the data (e.g., save it to a database)
  console.log('Received data:', { name, email });

  // Append email to a text file
  fs.appendFile('emails.txt', `${name},${email}\n`, (err) => {
    if (err) {
      console.error('Error appending email to file:', err);
      res.status(500).send('Error occurred while saving email.');
    } else {
      console.log('Email appended to file successfully.');
      res.send('Data received successfully!');
    }
  });
});

app.get('/mailinglist', (req, res) => {
    res.json(mailingList);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
