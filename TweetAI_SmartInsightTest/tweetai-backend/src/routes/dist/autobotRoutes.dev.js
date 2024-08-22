"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var express = require('express');

var router = express.Router();

var autobotService = require('../services/autobotService'); // Route to get all Autobots


router.get('/autobots', function _callee(req, res) {
  var _ref, _ref2, autobots;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM Autobots'));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          autobots = _ref2[0];
          res.json(autobots);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching Autobots:', _context.t0);
          res.status(500).json({
            error: 'Failed to fetch Autobots'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Route to get the count of Autobots

router.get('/autobots/count', function _callee2(req, res) {
  var _ref3, _ref4, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT COUNT(*) AS count FROM Autobots'));

        case 3:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          result = _ref4[0];
          res.json({
            count: result[0].count
          });
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching Autobots count:', _context2.t0);
          res.status(500).json({
            error: 'Failed to fetch Autobots count'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get('/test-db', function _callee3(req, res) {
  var _ref5, _ref6, rows;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT 1 + 1 AS solution'));

        case 3:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          rows = _ref6[0];
          res.json({
            result: rows[0].solution
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error('Database connection failed:', _context3.t0);
          res.status(500).json({
            error: 'Database connection failed'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;
//# sourceMappingURL=autobotRoutes.dev.js.map
