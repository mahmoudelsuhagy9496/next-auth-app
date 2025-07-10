"use client";
import React, { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { LoginSchema } from "@/utils/ValidationSchemes";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { LoginAction } from "@/actions/auth.action";
import SocialProviders from "@/components/SocialProviders";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      return setClientError(validation.error.errors[0].message);
    }
    setLoading(true);

    LoginAction({ email, password }).then((result) => {
      if (!result.success) setServerError(result.message);
      setLoading(false);
    });
  };
  return (
    <form action="" onSubmit={formSubmitHandler}>
      <div className="flex flex-col mb-3">
        <label
          htmlFor="email"
          className="font-bold text-slate-500 p-1 text-xl text-start"
        >
          Email :{" "}
        </label>
        <input
          type="email"
          id="email"
          className=" border border-slate-500 rounded-lg px-2 py-1 text-xl "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <label
          htmlFor="password"
          className="font-bold text-slate-500 p-1 text-xl text-start"
        >
          Password :{" "}
        </label>
        <input
          type="password"
          id="password"
          className=" border border-slate-500 rounded-lg px-2 py-1 text-xl "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {/* alert message */}
        {(clientError || serverError) && (
          <Alert type="error" message={clientError || serverError} />
        )}

        <button
          disabled={loading}
          className=" disabled:bg-green-300 flex items-center justify-center text-2xl mb-3 bg-slate-800 hover:bg-slate-950 text-white cursor-pointer rounded-lg mt-4 w-full p-2"
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              <IoMdLogIn className="me-1 text-2xl" /> Login{" "}
            </>
          )}
        </button>
       <SocialProviders />
      </div>
    </form>
  );
}
