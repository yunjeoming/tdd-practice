const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;

const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log('MongoDb connected')).catch(err => console.log(err));

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;