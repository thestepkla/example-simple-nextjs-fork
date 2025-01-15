import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function patchTypeService(id:number, req:any) {
    try {

        // Check request body โดยไม่ใช้ zod
        if (!req.name) {
            return {status: 400, response: {success: false, message: 'name is required'}};
        }

        //check type name is string
        if (typeof req.name !== 'string') {
            return {status: 400, response: {success: false, message: 'name must be a string'}};
        }

        if (req.name.length > 191) {
            return {status: 400, response: {success: false, message: 'name length is more 191 charater'}};
        }

        // Check if the type exists
        const hasType = await prisma.bookType.findFirst({
            where: {
                id: id
            },
            select: {
                id: true
            }
        })

        if (!hasType) {
            return {status: 404, response: {success: false, message: 'Type not found'}}
        }

        const type = await prisma.bookType.update({
            where: {
                id: id
            },
            data: {
                name: req.name
            }
        })

        return {status: 200, response: {success: true, message: 'update type success', data: type}}
    } catch (error) {
        console.log(error)
        return {status: 500, response: {success: false, message: 'Internal server error'}}
    }
}


export default patchTypeService;