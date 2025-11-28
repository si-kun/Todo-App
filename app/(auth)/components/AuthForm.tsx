"use client";

import { userAtom } from "@/app/atom/user/user";
import { signin } from "@/app/server-action/auth/signin";
import { signup } from "@/app/server-action/auth/signup";
import { signinSchema, SigninSchemaType } from "@/app/types/zod/signinResolver";
import { signupSchema, SignupSchemaType } from "@/app/types/zod/signupResolver";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

const AuthForm = () => {

  const setUser = useSetAtom(userAtom);

  const router = useRouter();
  const pathName = usePathname();

  const isSignup = pathName === "/signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupSchemaType | SigninSchemaType>({
    resolver: (isSignup
      ? zodResolver(signupSchema)
      : zodResolver(signinSchema)) as Resolver<
      SignupSchemaType | SigninSchemaType
    >,
  });

  const onSubmit = async (data: SignupSchemaType | SigninSchemaType) => {
    try {
      const result =
      isSignup
          ? await signup({ data: data as SignupSchemaType })
          : await signin({ data: data as SigninSchemaType });
      if (result.success) {
        toast.success(result.message);
        setUser(result.data);
        router.push("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("エラーが発生しました");
      console.error("Signup Error:", error);
    }
  };

  const buttonText = () => {
    if (pathName === "/signup" && isSubmitting) {
      return "登録中...";
    } else if (pathName === "/signup" && !isSubmitting) {
      return "新規登録";
    } else if (pathName === "/signin" && isSubmitting) {
      return "ログイン中...";
    } else {
      return "ログイン";
    }
  };

  return (
    <Card className="w-full max-w-sm space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader className="space-y-1">
          <CardTitle>{isSignup ? "新規登録" : "ログイン"}</CardTitle>
          <CardDescription>
            {isSignup ? "アカウントを作成してください" : "アカウントにログインしてください"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {pathName === "/signup" && (
              <div className="grid gap-2">
                <Label htmlFor="name">UserName</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="signup-userName"
                  required
                  {...register("name")}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={!isValid}
            type="submit"
            className="w-full bg-green-500 disabled:opacity-50 disabled:bg-gray-400"
          >
            {buttonText()}
          </Button>
          <Button asChild variant="link" className="w-full">
            <Link href={isSignup ? "/signin" : "/signup"}>
              {isSignup
                ? "すでにアカウントをお持ちの方はこちら"
                : "アカウントをお持ちでない方はこちら"}
            </Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
