const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

// Env Vars
const myEnv = dotenv.config();
dotenvExpand(myEnv);

const PORT = process.env.PORT || 5000;

const app = express();

// Enable CORS
app.use(cors());

// body parser
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
