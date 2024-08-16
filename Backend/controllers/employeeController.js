const Employee = require('../models/Employee');

// Get all employees with pagination
exports.getEmployees = async (req, res) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    const totalEmployees = await Employee.countDocuments();

    const employees = await Employee.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      employees,
      totalItems: totalEmployees,
      currentPage,
      totalPages: Math.ceil(totalEmployees / perPage)
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Get a single employee by ID
exports.getEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Error fetching employee" });
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Error adding employee" });
  }
};

// Edit an employee by ID
exports.editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updates = req.body;

    const employee = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee" });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findByIdAndDelete(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee" });
  }
};

