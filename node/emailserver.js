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

// Endpoint to fetch the mailing list
app.get('/mailinglist', (req, res) => {
    // Read the contents of the emails.txt file
    fs.readFile('emails.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error occurred while fetching mailing list.');
        } else {
            // Split the data into lines
            const lines = data.split('\n');
            // Create an array to store the mailing list
            const mailingList = [];
            // Iterate over each line
            lines.forEach((line) => {
                // Split the line into name and email
                const [name, email] = line.split(',');
                // Create an object with name and email properties
                const entry = { name, email };
                // Add the entry to the mailing list array
                mailingList.push(entry);
            });
            // Send the mailing list as JSON response
            res.json(mailingList);
        }
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
