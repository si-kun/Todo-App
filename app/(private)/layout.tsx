import { ReactNode } from "react";
import { JotaiProvider } from "../providers/JotaiProvider";
import { getCurrentUserWithData } from "@/lib/auth/getCurrentUser";
import LayoutClient from "./LayoutClient";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = async({ children }: PrivateLayoutProps) => {
  const user = await getCurrentUserWithData();

  return (
    <JotaiProvider initialUser={user}>
      <LayoutClient>{children}</LayoutClient>
    </JotaiProvider>
  );
};

export default PrivateLayout;
