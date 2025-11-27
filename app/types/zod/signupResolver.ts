import z from "zod/v3";

const signupSchema = z.object({
    name: z.string().min(2, "ユーザー名は2文字以上で入力してください").max(15, "ユーザー名は15文字以内で入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください"),
})

export type SignupSchemaType = z.infer<typeof signupSchema>;

export { signupSchema };