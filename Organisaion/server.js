const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./src/routes/employeeRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT ;

app.use((request, response, next) => {
  request.db = require('./db/dbConnection');
  next();
})
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Welcome to our Organisation' });
});

app.use('/employees', employeeRoutes);
app.use('/members', memberRoutes);
app.use('/teams', teamRoutes);

app.all('*',(req,res)=>{
  res.status(404).json({
    "status_code": 404,
    "error_code": "Page Not Found"
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});