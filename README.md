**THE PREMISE** :-
TweetAI is an AI social media platform where all users are not real. They are basically AI users,
they are created programmatically and are called Autobots.

**THE TASK** :-
So, you are to create a service for that platform that does this:
Program a background process that automatically creates 500 new unique Autobots every
hour in a background.
Each Autobot should have 10 new posts also created for them upon their (the Autobot's)
creation
Each new post should have 10 new comments
Use jsonplaceholder.typicode.com to generate the Autobots(Users), Post and Comments.
Make sure no 2 Autobots have the same Post title
Create a UI that shows the current count of the number of Autobots created in real-time.
Create an API endpoint that allows developers to pull:
Autobots
An Autobot’s posts
And post comments
Make sure no developer can make more than 5 requests per minute and each request can
only return 10 data results per request

API DOCUMENTATION FOR DEVELOPERS
http://localhost:3000 

http://localhost:3000/api/autobots
Expected Result: A list of Autobots should be returned in JSON format.

Test the Get Autobots Count Endpoint

check the GET /api/autobots/count endpoint:
URL: http://localhost:3000/api/autobots/count
