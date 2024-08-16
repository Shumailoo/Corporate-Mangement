const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  position: {
    type: String,
  },
  workingMonths: {
    type: Number,
  },
  shift: {
    type: String,
    enum: ['Day', 'Morning', 'Evening'] // Example of possible values
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'] // Basic email validation
  },
  department: {
    type: String,
  },
  location: {
    type: String,
  }
});

// Creating the model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
