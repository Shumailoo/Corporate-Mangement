const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  deliverables: {
    type: [String], // Array of strings
  },
  estimatedDeliveryDate: {
    type: Date,
    required: true
  },
  totalSprintMeetings: {
    type: Number,
  },
  employeeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee', // Reference to Employee model
  }]
});

// Creating the model from the schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
