// const express = require('express');
// const router = express.Router();
// const pool = require('../utils/db');
// const autobotsController = require('../controllers/autobotsController');


// router.get('/api/autobots/count', autobotsController.getAutobotCount);

// // Route to get the current count of Autobots
// router.get('/autobot-count', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Autobots');
//     res.json({ count: rows[0].count });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching autobot count' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const autobotService = require('../services/autobotService');

// // Route to get the count of Autobots
// router.get('/autobots/count', async (req, res) => {
//   try {
//     const count = await autobotService.getAutobotCount();
//     res.json({ count });
//   } catch (error) {
//     console.error('Error fetching Autobot count:', error);
//     res.status(500).json({ error: 'Failed to fetch Autobot count' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const autobotService = require('../services/autobotService');

// Route to get all Autobots
router.get('/autobots', async (req, res) => {
  try {
    const [autobots] = await pool.query('SELECT * FROM Autobots');
    res.json(autobots);
  } catch (error) {
    console.error('Error fetching Autobots:', error);
    res.status(500).json({ error: 'Failed to fetch Autobots' });
  }
});

// Route to get the count of Autobots
router.get('/autobots/count', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT COUNT(*) AS count FROM Autobots');
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching Autobots count:', error);
    res.status(500).json({ error: 'Failed to fetch Autobots count' });
  }
});

router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ result: rows[0].solution });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});


module.exports = router;


