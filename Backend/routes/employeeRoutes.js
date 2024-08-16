const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/employees', employeeController.getEmployees);
router.post('/employees', employeeController.addEmployee);
router.get('/employees/:id', employeeController.getEmployee);
router.put('/employees/:id', employeeController.editEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
