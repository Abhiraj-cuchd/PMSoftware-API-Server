import { Request, Response } from "express";
import { PrismaClient, Project } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (): Promise<Project[] | []> => {
    try {
        const projects = await prisma.project.findMany();
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const createProject = async (data: Project): Promise<Project | undefined> => {
    try {
        const { name, startDate, endDate, description } = data;
        const project: Project = await prisma.project.create({ data: { name, description, startDate, endDate } });
        return project;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
