"use server";

import { ApiResponse } from "@/app/types/api/api";
import { TodoSchema } from "@/app/types/zod/todoResolver";
import { requireAuth } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/prisma/prisma";

export const createTodo = async (data: TodoSchema): Promise<ApiResponse<null>> => {
    try {

        const user = await requireAuth();

        await prisma.$transaction(async (prisma) => {

            const {title,summary,status,startDate,endDate,priority,checklists,memos} = data;

            // Todoの作成
            const todo = await prisma.todo.create({
                data: {
                    userId: user.id,
                    title,
                    summary,
                    status,
                    startDate: startDate ? new Date(startDate) : null,
                    endDate: endDate ? new Date(endDate) : null,
                    priority,
                }
            })

            // Checklistの作成
            await prisma.checklist.createMany({
                data: checklists.map((checklist) => ({
                    todoId: todo.id,
                    title: checklist.title,
                    completed: checklist.completed,
                }))
            })

            // Memoの作成
            await prisma.memo.createMany({
                data: memos.map((memo) => ({
                    todoId: todo.id,
                    content: memo.content,
                }))
            })
            return todo;
        })

        return {
            success: true,
            message: "Todo created successfully.",
            data:null
        };
    } catch(error) {
        console.error("Error creating todo:", error);
        return {
            success: false,
            message: "Failed to create todo.",
            data: null
        };
    }
}