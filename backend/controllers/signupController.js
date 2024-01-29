const asyncHandler = require("express-async-handler");
const { MongoClient,ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    // version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
const postSignup = asyncHandler(async (req, res) => {
  try {
    console.log("Body", req.body);

    await client.connect();
    const db = client.db('TheLaundryBasket');
    const collection = db.collection('signup');

    // Find the first document in the collection
    const first = await collection.insertOne({
      username: req.body.username,
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
    });
    console.log(first,"signin");
    res.status(201).send(true);

  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
});
module.exports = {
  postSignup
}
