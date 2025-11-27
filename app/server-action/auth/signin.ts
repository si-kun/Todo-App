"use server";

import { ApiResponse } from "@/app/types/api/api";
import { SigninSchemaType } from "@/app/types/zod/signinResolver";
import { createClient } from "@/lib/supabase/server";

interface SigninData {
    data: SigninSchemaType;
}

export const signin = async ({data}: SigninData): Promise<ApiResponse<null>> => {
    const supabase = await createClient();

    try {
        const { error } = await supabase.auth.signInWithPassword({
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

        return {
            success: true,
            message: "サインインに成功しました",
            data: null,
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