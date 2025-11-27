import z from "zod/v3";

const signinSchema = z.object({
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください"),
})

export type SigninSchemaType = z.infer<typeof signinSchema>;

export { signinSchema };