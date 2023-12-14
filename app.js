import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import Employee from './models/employeeModel.js';

// initialisiere express Server
const app = express();
const PORT = 4000;

// Verbindung zu MongoDB herstellen mit Mongoose
const URI = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017';
mongoose.connect(URI)
  .then(() => console.log('Mit MongoDB verbunden', URI))
  .catch(console.log);

mongoose.connection.on("error", console.log);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Endpunkte
app.get('/employee', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.firstName) {
      query.firstName = req.query.firstName;
    }
    const employees = await Employee.find(query);
    
    res.send(employees);
  } catch (e) {
    next(e);
  }
});

app.post('/employee', async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).send(employee);
  } catch(e) {
    next(e);
  }
})

// 404
app.use((req, res, next) => {
  const error = new Error(`Eine ${req.method}-Abfrage auf ${req.url} ist ungültig.`);
  error.status = 404;
  next(error);
})

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.status ?? 500;
  res.status(statusCode).send({ message: err.message });
})

app.listen(PORT, () => console.log('Server gestartet'));