const asyncHandler = require("express-async-handler");
const { MongoClient,ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    //  version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const postcartProduct = asyncHandler(async (req, res) => {
  try {
    console.log("Body", req.body);

    await client.connect();
    const db = client.db('test');
    const collection = db.collection('cartproduct');

    // Find the first document in the collection
    const first = await collection.insertOne({
        name: req.body.name,
        imagePath: req.body.imagePath,
        price: req.body.price,
    });
    console.log(first,"signin");
    res.status(201).send(true);

  } finally {
    // Close the database connection when finished or an error occurs
    // await client.close();
  }
});

 const getcartProduct = asyncHandler(async(req,res) => {
  try{
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('cartproduct')
    const orders = await collection.find().toArray();
    console.log(orders);
    res.send(orders);
    }
    finally{
      // await client.close();
    }

 });

 const deleteCartProduct = asyncHandler(async(req,res) => {
  try{
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('cartproduct')
    const productId = req.params.name;
    console.log('Received productId:', productId)
    const myquery = { name:productId};
    const result = await collection.deleteOne(myquery);
    console.log("deleted")
    res.send(true);
    }
    finally{
      // await client.close();
    }

 });

module.exports = {
    postcartProduct,getcartProduct,deleteCartProduct
}
