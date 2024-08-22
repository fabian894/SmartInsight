// const express = require('express');
// const app = express();

// app.use(express.json());

// // Basic route to verify the server is running
// app.get('/', (req, res) => {
//   res.send('TweetAI Backend is running');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config();

const express = require('express');
const app = express();
const pool = require('./utils/db'); 
const autobotService = require('./services/autobotService');
const autobotRoutes = require('./routes/autobotRoutes');

app.use(express.json());

//app.use('/api', autobotService);
app.use('/api', autobotRoutes);

// verify the server is running
app.get('/', (req, res) => {
  res.send('TweetAI Backend is running');
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ result: rows[0].solution });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
