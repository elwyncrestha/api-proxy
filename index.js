const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Enable CORS
app.use(cors());

// body parser
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
