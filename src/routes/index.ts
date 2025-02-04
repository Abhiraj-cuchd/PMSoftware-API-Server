import express from 'express';
import projectRoutes from './project.route';
import taskRoutes from './task.route';


const router = express.Router();

// Single router.use with all routes
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes)

export default router;
