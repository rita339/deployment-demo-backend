import {faker} from '@faker-js/faker';
import mongoose from 'mongoose';
import Employee from './models/employeeModel.js';

const URI =
  process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017';

try {
  await mongoose.connect(URI);
  console.log('Mit MongoDB verbunden');

  mongoose.connection.on('error', console.log);

  const amount = 20;
  const fakeEmployeeData = [];

  for (let i = 0; i < amount; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const image = faker.image.urlLoremFlickr({ category: 'people' });
    const bio = faker.person.bio();
    const job = faker.person.jobTitle();
    fakeEmployeeData.push({ firstName, lastName, email, image, bio, job });
  }
  await Employee.insertMany(fakeEmployeeData);
  console.log('Seeding fertig');
} catch (error) {
  console.log(error);
} finally {
  mongoose.disconnect();
}