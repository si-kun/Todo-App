"use server";

import { ApiResponse } from "@/app/types/api/api";
import { createClient } from "@/lib/supabase/server";

export const signOut = async (): Promise<ApiResponse<null>> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        data: null,
        message: "Sign out failed",
      };
    }

    return {
      success: true,
      data: null,
      message: "Sign out successful",
    };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      data: null,
      message: "Sign out failed",
    };
  }
};
