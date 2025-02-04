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

export const createProject = async (data: Omit<Project, 'id'>): Promise<Project | undefined> => {
    try {
        const { name, description, startDate, endDate } = data;

        // Check for existing project to prevent duplicates
        const existingProject = await prisma.project.findFirst({
            where: {
                name: name,
                description: description
            }
        });

        if (existingProject) {
            console.log('Project already exists');
            return existingProject;
        }

        const project = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });

        return project;
    } catch (error) {
        console.error('Error creating project:', error);
        return undefined;
    }
}
