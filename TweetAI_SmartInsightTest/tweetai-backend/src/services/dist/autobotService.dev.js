"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var axios = require('axios');

var pool = require('../utils/db');

var cron = require('node-cron');

var crypto = require('crypto'); // Function to get the count of Autobots


function getAutobotCount() {
  var _ref, _ref2, rows;

  return regeneratorRuntime.async(function getAutobotCount$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT COUNT(*) AS count FROM Autobots'));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          return _context.abrupt("return", rows[0].count);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error getting Autobot count:', _context.t0);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // Function to create an Autobot


function createAutobot() {
  var _ref3, users, user, uniqueEmail, uniqueUsername, _ref4, _ref5, result, autobotId;

  return regeneratorRuntime.async(function createAutobot$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get('https://jsonplaceholder.typicode.com/users'));

        case 3:
          _ref3 = _context2.sent;
          users = _ref3.data;
          // Generate unique values
          user = users[Math.floor(Math.random() * users.length)]; // Randomly pick a user

          uniqueEmail = user.email + '.' + crypto.randomBytes(4).toString('hex'); // Ensure unique email

          uniqueUsername = user.username + '_' + crypto.randomBytes(4).toString('hex'); // Ensure unique username

          _context2.next = 10;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO Autobots (name, email, username) VALUES (?, ?, ?)', [user.name, uniqueEmail, uniqueUsername]));

        case 10:
          _ref4 = _context2.sent;
          _ref5 = _slicedToArray(_ref4, 1);
          result = _ref5[0];
          autobotId = result.insertId; // Create 10 posts for the new Autobot

          _context2.next = 16;
          return regeneratorRuntime.awrap(createPostsForAutobot(autobotId));

        case 16:
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          console.error('Error creating Autobot:', _context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
} // Function to create posts for a specific Autobot


function createPostsForAutobot(autobotId) {
  var _ref6, posts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, post, uniqueTitle, _ref7, _ref8, postResult, postId;

  return regeneratorRuntime.async(function createPostsForAutobot$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(axios.get('https://jsonplaceholder.typicode.com/posts'));

        case 3:
          _ref6 = _context3.sent;
          posts = _ref6.data;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 8;
          _iterator = posts[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 24;
            break;
          }

          post = _step.value;
          uniqueTitle = post.title + '_' + crypto.randomBytes(4).toString('hex');
          _context3.next = 15;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO Posts (autobot_id, title, body) VALUES (?, ?, ?)', [autobotId, uniqueTitle, post.body]));

        case 15:
          _ref7 = _context3.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          postResult = _ref8[0];
          postId = postResult.insertId; // Create 10 comments for each post

          _context3.next = 21;
          return regeneratorRuntime.awrap(createCommentsForPost(postId));

        case 21:
          _iteratorNormalCompletion = true;
          _context3.next = 10;
          break;

        case 24:
          _context3.next = 30;
          break;

        case 26:
          _context3.prev = 26;
          _context3.t0 = _context3["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 30:
          _context3.prev = 30;
          _context3.prev = 31;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 33:
          _context3.prev = 33;

          if (!_didIteratorError) {
            _context3.next = 36;
            break;
          }

          throw _iteratorError;

        case 36:
          return _context3.finish(33);

        case 37:
          return _context3.finish(30);

        case 38:
          _context3.next = 43;
          break;

        case 40:
          _context3.prev = 40;
          _context3.t1 = _context3["catch"](0);
          console.error('Error creating posts:', _context3.t1);

        case 43:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 40], [8, 26, 30, 38], [31,, 33, 37]]);
} // Function to create comments for a specific post


function createCommentsForPost(postId) {
  var _ref9, comments, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, comment;

  return regeneratorRuntime.async(function createCommentsForPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios.get('https://jsonplaceholder.typicode.com/comments'));

        case 3:
          _ref9 = _context4.sent;
          comments = _ref9.data;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 8;
          _iterator2 = comments[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 17;
            break;
          }

          comment = _step2.value;
          _context4.next = 14;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO Comments (post_id, name, email, body) VALUES (?, ?, ?, ?)', [postId, comment.name, comment.email, comment.body]));

        case 14:
          _iteratorNormalCompletion2 = true;
          _context4.next = 10;
          break;

        case 17:
          _context4.next = 23;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](8);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 23:
          _context4.prev = 23;
          _context4.prev = 24;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 26:
          _context4.prev = 26;

          if (!_didIteratorError2) {
            _context4.next = 29;
            break;
          }

          throw _iteratorError2;

        case 29:
          return _context4.finish(26);

        case 30:
          return _context4.finish(23);

        case 31:
          _context4.next = 36;
          break;

        case 33:
          _context4.prev = 33;
          _context4.t1 = _context4["catch"](0);
          console.error('Error creating comments:', _context4.t1);

        case 36:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 33], [8, 19, 23, 31], [24,, 26, 30]]);
} // Schedule a task to run every hour to create 500 Autobots


cron.schedule('0 * * * *', function _callee() {
  var i;
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          i = 0;

        case 2:
          if (!(i < 500)) {
            _context5.next = 8;
            break;
          }

          _context5.next = 5;
          return regeneratorRuntime.awrap(createAutobot());

        case 5:
          i++;
          _context5.next = 2;
          break;

        case 8:
          console.log('500 Autobots created successfully!');
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error('Error in scheduled task:', _context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Schedule a task to run every minute to create 500 Autobots
// cron.schedule('* * * * *', async () => {
//   for (let i = 0; i < 500; i++) {
//     await createAutobot();
//   }
//   console.log('500 Autobots created successfully!');
// });

module.exports = {
  getAutobotCount: getAutobotCount
};
//# sourceMappingURL=autobotService.dev.js.map
