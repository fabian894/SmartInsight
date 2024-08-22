const axios = require('axios');
const pool = require('../utils/db');
const cron = require('node-cron');
const crypto = require('crypto');

// Function to get the count of Autobots
async function getAutobotCount() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Autobots');
    return rows[0].count;
  } catch (error) {
    console.error('Error getting Autobot count:', error);
    throw error;
  }
}

// Function to create an Autobot
async function createAutobot() {
  try {
    const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    // Generate unique values
    const user = users[Math.floor(Math.random() * users.length)]; // Randomly pick a user
    const uniqueEmail = user.email + '.' + crypto.randomBytes(4).toString('hex'); // Ensure unique email
    const uniqueUsername = user.username + '_' + crypto.randomBytes(4).toString('hex'); // Ensure unique username
    
    const [result] = await pool.query(
      'INSERT INTO Autobots (name, email, username) VALUES (?, ?, ?)',
      [user.name, uniqueEmail, uniqueUsername]
    );

    const autobotId = result.insertId;

    // Create 10 posts for the new Autobot
    await createPostsForAutobot(autobotId);

  } catch (error) {
    console.error('Error creating Autobot:', error);
  }
}

// Function to create posts for a specific Autobot
async function createPostsForAutobot(autobotId) {
  try {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
    for (const post of posts) {
      const uniqueTitle = post.title + '_' + crypto.randomBytes(4).toString('hex'); 

      const [postResult] = await pool.query(
        'INSERT INTO Posts (autobot_id, title, body) VALUES (?, ?, ?)',
        [autobotId, uniqueTitle, post.body]
      );

      const postId = postResult.insertId;

      // Create 10 comments for each post
      await createCommentsForPost(postId);
    }
  } catch (error) {
    console.error('Error creating posts:', error);
  }
}

// Function to create comments for a specific post
async function createCommentsForPost(postId) {
  try {
    const { data: comments } = await axios.get('https://jsonplaceholder.typicode.com/comments');
    
    for (const comment of comments) {
      await pool.query(
        'INSERT INTO Comments (post_id, name, email, body) VALUES (?, ?, ?, ?)',
        [postId, comment.name, comment.email, comment.body]
      );
    }
  } catch (error) {
    console.error('Error creating comments:', error);
  }
}

// Schedule a task to run every hour to create 500 Autobots
cron.schedule('0 * * * *', async () => {
  try {
    for (let i = 0; i < 500; i++) {
      await createAutobot();
    }
    console.log('500 Autobots created successfully!');
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
});
// Schedule a task to run every minute to create 500 Autobots
// cron.schedule('* * * * *', async () => {
//   for (let i = 0; i < 500; i++) {
//     await createAutobot();
//   }
//   console.log('500 Autobots created successfully!');
// });


module.exports = { getAutobotCount };
