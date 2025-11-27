"use server";

import { ApiResponse } from "@/app/types/api/api";
import { SignupSchemaType } from "@/app/types/zod/signupResolver";
import { prisma } from "@/lib/prisma/prisma";
import { createClient } from "@/lib/supabase/server";

interface SignupData {
    data: SignupSchemaType;
}

export const signup = async ({data}:SignupData):Promise<ApiResponse<null>> => {

    const supabase = await createClient();

    try {

        // supabaseの登録
        const supabaseAuth = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        })

        if(supabaseAuth.error || !supabaseAuth.data.user) {
            console.error("Supabase Signup Error:", supabaseAuth.error);
            return {
                success: false,
                message: "サインアップに失敗しました",
                data: null,
            }
        }

        // prismaの登録

        try {

            await prisma.user.create({
                data: {
                    id: supabaseAuth.data.user.id,
                    name: data.name,
                    email: data.email,
                }
            })

        } catch(prismaError) {
            console.error("Prisma User Creation Error:", prismaError);

            // prismaで失敗したらsupabaseのユーザーを削除
            await supabase.auth.admin.deleteUser(supabaseAuth.data.user.id);

            return {
                success: false,
                message: "ユーザー情報の保存に失敗しました",
                data: null,
            }
        }

        return {
            success: true,
            message: "サインアップに成功しました",
            data: null,
        }

    } catch(error) {
        console.error("Signup Error:", error);
        return {
            success: false,
            message: "サインアップに失敗しました",
            data: null,
        };
    }
}