
const pool = require('../utils/db');

exports.getAutobotCount = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Autobots');
    res.json({ count: rows[0].count });
  } catch (error) {
    console.error('Error fetching autobot count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
