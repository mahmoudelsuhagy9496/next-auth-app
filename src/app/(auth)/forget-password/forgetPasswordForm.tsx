"use client";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { ForgotPasswordSchema } from "@/utils/ValidationSchemes";
import { forgotPasswordAction } from "@/actions/password.action";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = ForgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      return setClientError(validation.error.errors[0].message);
    }
    setLoading(true);
    forgotPasswordAction({ email })
      .then((res) => {
        if (res.success) {
          setClientError("");
          setServerError("");
          setEmail("");
          setServerSuccess(res.message);
        }
        if (!res.success) {
          setServerSuccess("");
          setServerError(res.message);
        }
        setLoading(false);
      })
      .catch(() => {
        setServerError("Somethin went wrong");
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

        {/* alert message */}
        {(clientError || serverError) && (
          <Alert type="error" message={clientError || serverError} />
        )}
        {serverSuccess && <Alert type="success" message={serverSuccess} />}

        <button
          disabled={loading}
          className=" disabled:bg-green-300 flex items-center justify-center text-2xl mb-3 bg-slate-800 hover:bg-slate-950 text-white cursor-pointer rounded-lg mt-4 w-full p-2"
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              <CiMail className="me-1 text-2xl" /> Submit{" "}
            </>
          )}
        </button>
        <div className="p-1 mt-2">
          <Link href="/login">Back to login</Link>
        </div>
      </div>
    </form>
  );
}
