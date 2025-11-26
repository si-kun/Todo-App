"use server";

import { TodoWithRelations } from "@/app/atom/todo/todo";
import { ApiResponse } from "@/app/types/api/api";
import { prisma } from "@/lib/prisma/prisma";

export const  getByTodoId = async (todoId: string):Promise<ApiResponse<TodoWithRelations | null>> => {
    try {

        const response = await prisma.todo.findUnique({
            where: {
                id: todoId
            },
            include: {
                checklists: true,
                memos: true,
            }
        })

        if(!response) {
            return {
                success: false,
                message: "Todo not found.",
                data: null
            };
        }

        return {
            success: true,
            message: "Todo fetched successfully.",
            data: response
        }
    } catch (error) {
        console.error("Error fetching todo by ID:", error);
        return {
            success: false,
            message: "Failed to fetch todo.",
            data: null,
        }
    }
}