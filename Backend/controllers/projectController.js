const Project = require('../models/Project'); // Assuming your Project model is in the models directory

// Get all projects with pagination
exports.getProjects = async (req, res) => {
  console.log(req.cookies);
  
  const currentPage = req.query.page || 1;
  const pageSize = 2;
  const skip = (currentPage - 1) * pageSize;

  try {
    const projects = await Project.find()
      .skip(skip)
      .limit(Number(pageSize))
      .populate('employeeIds', 'name position'); // Populate employee details

    const totalProjects = await Project.countDocuments();
    res.status(200).json({
      projects,
      currentPage: Number(currentPage),
      totalPages: Math.ceil(totalProjects / pageSize),
      totalProjects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
};

// Get a single project by ID
exports.getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate('employeeIds', 'name position');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error fetching project' });
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  console.log(12,req.body);
  
  try {
    const projectName=req.body.projectName;
    const estimatedDeliveryDate=req.body.estimatedDeliveryDate;
    const description=req.body.description || "project";
    const totalSprintMeetings=req.body.totalSprintMeetings || 1;
    const deliverables=req.body.deliverables || [];
    const employeeIds=req.body.employeeIds || [];
    const newProject = new Project({
      projectName:projectName,
      estimatedDeliveryDate:estimatedDeliveryDate,
      description:description,
      totalSprintMeetings:totalSprintMeetings,
      deliverables:deliverables,
      employeeIds:employeeIds,
    });
    const savedProject = await newProject.save();

    // Optionally, populate employee details if needed
    const populatedProject = await Project.findById(savedProject._id).populate('employeeIds', 'name position');

    res.status(201).json({
      message: 'Project added successfully',
      project: populatedProject
    });
  } catch (error) {
    // console.error('Error adding project:', error);
    res.status(500).json({ message: 'Server error adding project' });
  }
};

// Edit a project by ID
exports.editProject = async (req, res) => {
  const { projectId } = req.params;
  const updateData = req.body;

  try {
    const project = await Project.findByIdAndUpdate(projectId, updateData, { new: true }).populate('employeeIds', 'name position');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error updating project' });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error deleting project' });
  }
};
