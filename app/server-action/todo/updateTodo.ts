"use server";

import { ApiResponse } from "@/app/types/api/api";
import { TodoSchema } from "@/app/types/zod/todoResolver";
import { prisma } from "@/lib/prisma/prisma";

export const updateTodo = async (data:TodoSchema):Promise<ApiResponse<null>> => {
    try {
        const {todoId,title,summary,status,startDate,endDate,priority,checklists,memos} = data;

        if(!todoId) {
            return {
                success: false,
                message: "Todo ID is required.",
                data: null
            };
        }
        

        // checklistsとmemosを削除してから更新する
        await prisma.$transaction([
            prisma.checklist.deleteMany({
                where: {
                    todoId,
                }
            }),
            prisma.memo.deleteMany({
                where: {
                    todoId,
                }
            }),

            // checklistsの再生成
            prisma.checklist.createMany({
                data: checklists.map((checklist) => ({
                    todoId,
                    title: checklist.title,
                    completed: checklist.completed,
                }))
            }),

            // memosの再生成
            prisma.memo.createMany({
                data: memos.map((memo) => ({
                    todoId,
                    content: memo.content,
                }))
            }),

            prisma.todo.update({
                where: {
                    id: todoId
                },
                data: {
                    title,
                    summary,
                    status,
                    startDate: startDate ? new Date(startDate) : null,
                    endDate: endDate ? new Date(endDate) : null,
                    priority,
                }
            })
        ])


        return {
            success: true,
            message: "Todo updated successfully.",
            data: null
        }
    }catch(error) {
        console.error("Error updating todo:", error);
        return {
            success: false,
            message: "Failed to update todo.",
            data: null,
        }
    }
}