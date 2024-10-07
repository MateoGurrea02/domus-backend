const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');
const userRoutes = require('./src/routes/userRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes')
const agentRoutes = require('./src/routes/agentRoutes')
const clientRoutes = require('./src/routes/clientRoutes')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', propertyRoutes);
app.use('/api', agentRoutes);
app.use('/api', clientRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
