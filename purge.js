import mongoose from 'mongoose';
import Employee from './models/employeeModel.js';

const URI =
  process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017';

try {
  await mongoose.connect(URI);
  console.log('Mit MongoDB verbunden');

  mongoose.connection.on('error', console.log);

  await Employee.deleteMany({});
  console.log('Datenbank gepurget');
} catch (error) {
  console.log(error);
} finally {
  mongoose.disconnect();
}
