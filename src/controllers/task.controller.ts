import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (projectId: number): Promise<Task[] | []> => {
    try {

        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId)
            },
            include: {
                comments: true,
                attachments: true,
                author: true,
                assignee: true
            }
        });
        return tasks;
    } catch (error) {
        console.error('Error fetching Tasks:', error);
        return [];
    }
};


export const createTasks = async (data: Omit<Task, 'id'>): Promise<Task | undefined> => {
    try {
        const { title, description, startDate, dueDate, status, priority, tags, points, projectId, assignedUserId, authorUserId } = data;

        const existingTask = await prisma.task.findFirst({
            where: {
                title: title,
                description: description
            }
        });

        if (existingTask) {
            console.log('Task already exists');
            return existingTask;
        }

        const task = await prisma.task.create({
            data: {
                title, description, startDate, dueDate, status, priority, tags, points, projectId, assignedUserId, authorUserId
            }
        });

        return task;
    } catch (error) {
        console.error('Error creating project:', error);
        return undefined;
    }
}


export const updateTaskStatus = async (taskId: number, status: string) => {
    try {
        console.log(taskId, 'taskId')
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId)
            },
            data: {
                status: status
            }
        });
        return updatedTask;
    } catch (error) {
        console.log(error)
        return false
    }
}
