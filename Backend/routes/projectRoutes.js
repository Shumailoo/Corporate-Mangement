const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController'); // Adjust the path as necessary

// Route to get all projects with pagination
router.get('/projects', projectController.getProjects);

router.post("/projects",projectController.addProject);

// Route to get a single project by ID
router.get('/projects/:projectId', projectController.getProject);

// Route to update a project by ID
router.put('/projects/:projectId', projectController.editProject);

// Route to delete a project by ID
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;
