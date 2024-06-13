"use client";

import React from "react";
import { api } from "@/trpc/react";

const RegisterButton = () => {
  const register = api.register.email.useMutation({
    onSuccess: () => {
      console.log("Registration successful");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  return (
    <button
      onClick={() =>
        register.mutate({
          name: "Example Name",
          email: "example@email.com",
          password: "examlepassword",
        })
      }
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      Register
    </button>
  );
};

export default RegisterButton;
