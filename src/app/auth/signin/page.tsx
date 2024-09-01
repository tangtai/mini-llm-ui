"use client";

import { getProviders, signIn, useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showRegister, sethowRegister] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState("");

  const { data: provider } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
  });

  const {
    mutate: signInWithEmail,
    isPending: signInPending,
    error: signInError,
  } = useEmailSignin();

  const {
    mutate: registerWithEmail,
    isPending: registerPending,
    error: registerError,
  } = api.register.email.useMutation({
    onSuccess: () => {
      signInWithEmail({
        email,
        password,
      });
    },
  });

  useEffect(() => {
    setDisplayName(email.split("@")[0]);
  }, [email]);

  useEffect(() => {
    if (signInPending || registerPending) {
      setErrorDisplay("");
    } else if (signInError) {
      setErrorDisplay(signInError.message);
    } else if (registerError) {
      setErrorDisplay(registerError.message);
    }
  }, [signInPending, registerPending, signInError, registerError]);

  const handleEmailLogin = async () => {
    await signInWithEmail({
      email,
      password,
    });
  };

  const handleEmailRegister = async () => {
    registerWithEmail({
      name: email.split("@")[0],
      email: email,
      password: password,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showRegister) {
      handleEmailRegister();
    } else {
      handleEmailLogin();
    }
  };

  const toggleLoginRegister = () => {
    sethowRegister(!showRegister);
    setErrorDisplay("");
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-secondary px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Mini LLM UI</h1>
          <h1 className="text-sm font-semibold tracking-tighter text-zinc-400">
            a demo by Tangtai
          </h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-2">
              <div className="mt-4 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@somemail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {showRegister ? (
                <div className="space-y-2">
                  <Label htmlFor="displayname">Display name</Label>
                  <Input
                    id="displayname"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              ) : null}

              <p className="h-4 text-sm text-destructive">{errorDisplay}</p>
            </CardContent>

            {showRegister ? (
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signInPending}
                >
                  Create account
                </Button>
                <p className="py-1 text-xs">or</p>
                <Button
                  variant="secondary"
                  className="w-full"
                  type="button"
                  onClick={toggleLoginRegister}
                  disabled={signInPending}
                >
                  Back to login
                </Button>
              </CardFooter>
            ) : (
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerPending}
                >
                  Sign in
                </Button>
                <p className="py-1 text-xs">or</p>
                <Button
                  variant="secondary"
                  className="w-full"
                  type="button"
                  onClick={toggleLoginRegister}
                  disabled={registerPending}
                >
                  Register
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            or continue with
          </p>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>

        <div>
          {provider &&
            Object.entries(provider).map(([key, value]) => {
              if (key == "discord") {
                return (
                  <div key={key}>
                    <Button
                      variant="outline"
                      className="w-full px-4"
                      onClick={() =>
                        signIn(key as string, {
                          callbackUrl: "/posts-server-action",
                        })
                      }
                    >
                      <DiscordLogoIcon className="mr-2 h-4 w-4" />
                      {key}
                    </Button>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}

interface EmailAuthCredentials {
  email: string;
  password: string;
}

const useEmailSignin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password }: EmailAuthCredentials) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/posts-server-action",
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    },
    onError: (error) => {
      console.error("Failed to sign in:", error.message);
    },
    onSuccess: () => {
      router.push("/chat-ssr");
    },
  });
};
