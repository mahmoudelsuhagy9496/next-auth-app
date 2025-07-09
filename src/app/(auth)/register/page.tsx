import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <section className="w-2/5">
      <div className=" bg-amber-100 rounded-2xl m-auto p-5">
        <h2 className="text-2xl text-slate-300 text-center mb-5">
          {" "}
          Create new account{" "}
        </h2>
        {/* register form  */}
        <RegisterForm />
        <p className="p-2 mt-3">
         Already have account ?
          <Link href="/login" className="text-blue-500 text-xl">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
