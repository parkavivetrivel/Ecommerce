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

const getlogin = asyncHandler(async (req, res) => {
//   res.redirect('http://localhost:4200')
  
   try {
  console.log("Body", req.body);
  await client.connect();
  const db = client.db('TheLaundryBasket');
  const orders = db.collection("signup")
  const second = await orders.find({
    username: req.body.username,
    password: req.body.password
  }).toArray();
  if (second.length > 0) {
    console.log(second);
    res.send(true);
  }
  else {
    console.log("error");
    res.send(false);
  }
} finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
});
module.exports = { getlogin }