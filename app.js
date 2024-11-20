const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const agentRoutes = require('./routes/agentRoutes'); // Import agent routes

require('dotenv').config();
const { swaggerUi, specs } = require('./swagger');
const app = express();

// Middleware
app.use(express.json());  // Built-in middleware for parsing JSON
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded data support

// MongoDB connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api', agentRoutes);

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customHeaders: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
}));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.get('/swagger.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/x-yaml');
  res.send(yaml.dump(specs));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
