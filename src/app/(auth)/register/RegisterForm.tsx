"use client";
import { RegisterAction } from "@/actions/auth.action";
import Alert from "@/components/Alert";
import SocialProviders from "@/components/SocialProviders";
import Spinner from "@/components/Spinner";
import { RegisterSchema } from "@/utils/ValidationSchemes";
import { useState } from "react";
import { BsPersonPlus } from "react-icons/bs";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = RegisterSchema.safeParse({ name, email, password });
    if (!validation.success) {
      return setClientError(validation.error.errors[0].message);
    }
    RegisterAction({ name, email, password }).then((result) => {
      setLoading(true);
      if (result.success) {
        setServerSuccess(result.message);
        setServerError("");
        setName("");
        setEmail("");
        setPassword("");
        setClientError("");
      }
      if (!result.success) {
        setServerError(result.message);
        setServerSuccess("");
      }
      setLoading(false);
    });
  };
  return (
    <form action="" onSubmit={formSubmitHandler}>
      <div className="flex flex-col mb-3">
        <label
          htmlFor="name"
          className="font-bold text-slate-500 p-1 text-xl text-start"
        >
          Username :{" "}
        </label>
        <input
          type="text"
          id="name"
          className=" border border-slate-500 rounded-lg px-2 py-1 text-xl "
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
              <BsPersonPlus className="me-2 text-2xl" /> Register{" "}
            </>
          )}
        </button>
       <SocialProviders />
      </div>
    </form>
  );
}
