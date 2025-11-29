"use client";

import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useSetAtom } from "jotai";
import { userAtom } from "@/app/atom/user/user";
import { signOut } from "@/app/server-action/auth/signout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const setUser = useSetAtom(userAtom);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await signOut();

      if (result.success) {
        setUser(null);
        toast.success("ログアウトしました");
        router.push("/signin");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("ログアウトに失敗しました");
    }
  };

  return (
    <SidebarFooter>
      <Button type="button" variant={"default"} onClick={handleLogout} className="w-full">
        ログアウト
      </Button>
    </SidebarFooter>
  );
};

export default LogoutButton;
