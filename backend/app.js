require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const profilesRoutes = require('./routes/profiles');

const app = express();

const ports = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb://localhost:27017`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(ports, console.log(`Server is running on port ${ports}`));
  })
  .catch((err) => console.log(`Could not connect to database server`, err));

app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join('images')));

app.use('/api/profiles', profilesRoutes);

app.use("/signup", require("./routes/signupRoutes.js"));

app.use("/login", require("./routes/loginRoutes.js"));

app.use("/cartProduct", require("./routes/cartproductRoutes.js"));
