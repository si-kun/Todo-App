"use server";

import { ApiResponse } from "@/app/types/api/api";
import { prisma } from "@/lib/prisma/prisma";

export const deleteTodo = async (todoId: string):Promise<ApiResponse<null>> => {
    try {

        await prisma.todo.delete({
            where: {
                id: todoId,
            }
        })

        return {
            data: null,
            success: true,
            message: "Todo deleted successfully.",
        }

    } catch(error) {
        console.error("Error deleting todo:", error);
        return {
            data: null,
            success: false,
            message: "Failed to delete todo.",
        };
    }
}