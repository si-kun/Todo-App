import { User } from "@prisma/client";
import { prisma } from "../prisma/prisma";
import { createClient } from "../supabase/server";

export const getCurrentUser = async () => {
    const supabase = await createClient();
    const {data: { user}} = await supabase.auth.getUser();
    return user;
}

export const requireAuth = async () => {
    const user = await getCurrentUser();
    if(!user) {
        throw new Error("認証が必要です");
    }
    return user;
}

export const getCurrentUserWithData = async ():Promise<User | null> => {
    const supabase = await createClient();

    const {data: { user}} = await supabase.auth.getUser();

    if(!user) return null;

    const userData = await prisma.user.findUnique({
        where: {id: user.id},
    })

    return userData;
}