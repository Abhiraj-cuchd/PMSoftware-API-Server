import { Request, Response, Router } from "express";
import { createTasks, getTasks, updateTaskStatus } from "../controllers/task.controller";

const route = Router();
route.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const projectId: any = req.query.projectId;
        const tasks = await getTasks(projectId);
        if (tasks) {
            res.status(200).json({
                isSuccess: true,
                msg: "Tasks Fetched Succesfully",
                tasks
            })
        } else {
            res.status(404).json({
                isSuccess: false,
                msg: "Tasks Not Found"
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
        const task = await createTasks(req.body);
        if (task) {
            res.status(201).json({
                isSuccess: true,
                msg: "Task Created Successfully",
                task
            });
        } else {
            res.status(400).json({
                isSuccess: false,
                msg: "Task Not Created, Please check logs",
            });
        }
    } catch (error) {
        console.log("Error Occured: ", error);
        res.status(500).json({
            isSuccess: false,
            msg: "Internal Server Error"
        })
    }
});

route.patch('/:taskId', async (req: Request, res: Response) => {
    try {
        const { taskId }: any = req.params;
        const { status }: any = req.body;
        const updatedTask = await updateTaskStatus(taskId, status);
        if (updatedTask) {
            res.status(201).json({
                isSuccess: true,
                msg: "Task Updated",
                updatedTask
            });
        } else {
            res.status(400).json({
                isSuccess: false,
                msg: "Task Not Updated",
            });
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            isSuccess: false,
            msg: "Internal Server Error"
        })
    }
})



export default route;
