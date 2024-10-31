const path = require('path')

const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');

const { sequelize } = require('./src/models');

const userRoutes = require('./src/routes/userRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes')
const agentRoutes = require('./src/routes/agentRoutes')
const clientRoutes = require('./src/routes/clientRoutes')
const rentRoutes = require('./src/routes/rentRoutes')
const saleRoutes = require('./src/routes/saleRoutes')
const imageRoutes = require('./src/routes/imageRoutes')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', propertyRoutes);
app.use('/api', agentRoutes);
app.use('/api', clientRoutes);
app.use('/api', rentRoutes)
app.use('/api', saleRoutes)
app.use('/api', imageRoutes)
app.use('/media/img', express.static(path.join(__dirname, 'media/img')));

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
