import { Request, Response, Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller";

const route = Router();
route.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await getProjects();
        if (projects) {
            res.status(200).json({
                isSuccess: true,
                msg: "Projects Fetched Succesfully",
                projects
            })
        } else {
            res.status(404).json({
                isSuccess: false,
                msg: "Projects Not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            msg: "Internal Server Error"
        });
    }
});

route.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await createProject(req.body);
        if (project) {
            res.status(201).json({
                isSuccess: true,
                msg: "Project Created Successfully",
                project
            });
        } else {
            res.status(400).json({
                isSuccess: false,
                msg: "Project Not Created, Please check logs",
            });
        }
    } catch (error) {
        console.log("Error Occured: ", error);
        res.status(500).json({
            isSuccess: false,
            msg: "Internal Server Error"
        })
    }
})



export default route;
