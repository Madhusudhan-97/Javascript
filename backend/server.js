const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Resume Builder API');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));