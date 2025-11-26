import z from "zod/v3";

const todoSchema = z.object({
    todoId: z.string(),
    title: z.string().min(1, "タイトルは必須です").max(20, "タイトルは20文字以内で入力してください"),
    summary: z.string().max(100, "概要は100文字以内で入力してください").nullable(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE", "ON_HOLD"]),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "EMERGENCY"]),
    checklists: z.array(z.object({
        title: z.string().min(1, "チェックリストのタイトルは必須です").max(15, "チェックリストのタイトルは15文字以内で入力してください"),
        completed: z.boolean()
    })),
    memos: z.array(z.object({
        content: z.string().min(1, "メモの内容は必須です").max(200, "メモの内容は200文字以内で入力してください"),
    }))
})

export type TodoSchema = z.infer<typeof todoSchema>;

export { todoSchema };