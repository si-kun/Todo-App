"use server";

import { TodoWithRelations } from "@/app/atom/todo/todo";
import { ApiResponse } from "@/app/types/api/api";
import { prisma } from "@/lib/prisma/prisma";

export const getAllTodo = async (): Promise<ApiResponse<TodoWithRelations[]>> => {
  try {
    const response = await prisma.todo.findMany({
      where: {
        userId: "dammy-user-id",
      },
      include: {
        checklists: true,
        memos: true,
      },
      orderBy: [
        {
          completed: "asc",
        },
        {
          endDate: "asc",
        },
        {
          priority: "desc",
        }
      ],
    });

    return {
      data: response,
      success: true,
      message: "Todos fetched successfully.",
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      data: [],
      success: false,
      message: "Failed to fetch todos.",
    };
  }
};
