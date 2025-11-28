"use server";

import { ApiResponse } from "@/app/types/api/api";
import { SigninSchemaType } from "@/app/types/zod/signinResolver";
import { prisma } from "@/lib/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { User } from "@prisma/client";

interface SigninData {
    data: SigninSchemaType;
}

export const signin = async ({data}: SigninData): Promise<ApiResponse<User | null>> => {
    const supabase = await createClient();

    try {
        const { error, data:authData } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) {
            console.error("Supabase Signin Error:", error);
            return {
                success: false,
                message: error.message || "サインインに失敗しました",
                data: null,
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                id: authData.user.id,
            }
        })

        if(!user) {
            return {
                success: false,
                message: "ユーザーが見つかりません",
                data: null,
            }
        }

        return {
            success: true,
            message: "サインインに成功しました",
            data: user,
        }

    } catch(error) {
        console.error("Signin Error:", error);
        return {
            success: false,
            message: "サインイン中にエラーが発生しました",
            data: null,
        }
    }
}