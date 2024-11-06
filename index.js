const express = require('express');
const app = express();
const cors = require('cors');
const UserRoute = require('./Routes/UserRoute');
const AdminRoute = require('./Routes/AdminRoute');

app.use(cors());
app.use(express.json());

app.use('/user', UserRoute);
app.use('/admin', AdminRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Task Management System');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});