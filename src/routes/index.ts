import express from 'express';
import projectRoutes from './project.route';

const router = express.Router();

// Single router.use with all routes
router.use("/projects", projectRoutes)

export default router;
