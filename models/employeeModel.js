import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: String,
  image: String,
  bio: String,
  job: String
})

const Employee = model('Employee', employeeSchema)

export default Employee;