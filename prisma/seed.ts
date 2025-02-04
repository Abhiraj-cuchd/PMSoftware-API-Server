import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
    // Delete in reverse order to handle foreign key constraints
    const modelNames = orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });

    for (const modelName of modelNames.reverse()) {
        const model: any = prisma[modelName as keyof typeof prisma];
        try {
            await model.deleteMany({});
            console.log(`Cleared data from ${modelName}`);
        } catch (error) {
            console.error(`Error clearing data from ${modelName}:`, error);
        }
    }
}

async function main() {
    const dataDirectory = path.join(__dirname, "seedData");

    // Order based on schema relationships:
    // 1. Team (independent)
    // 2. User (depends on Team via optional teamId)
    // 3. Project (independent)
    // 4. ProjectTeam (depends on Team and Project)
    // 5. Task (depends on Project, User for author and optional assignee)
    // 6. TaskAssignment (depends on Task and User)
    // 7. Attachment (depends on Task and User)
    // 8. Comment (depends on Task and User)
    const orderedFileNames = [
        "team.json",
        "user.json",
        "project.json",
        "projectTeam.json",
        "task.json",
        "taskAssignment.json",
        "attachment.json",
        "comment.json",
    ];

    await deleteAllData(orderedFileNames);

    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDirectory, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const modelName = path.basename(fileName, path.extname(fileName));
        const model: any = prisma[modelName as keyof typeof prisma];

        try {
            for (const data of jsonData) {
                await model.create({ data });
            }
            console.log(`Seeded ${modelName} with data from ${fileName}`);
        } catch (error) {
            console.error(`Error seeding data for ${modelName}:`, error);
        }
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
