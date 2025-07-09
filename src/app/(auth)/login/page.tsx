import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="w-2/5">
      <div className=" bg-amber-100 rounded-2xl m-auto p-5">
        <h2 className="text-2xl text-slate-300 text-center mb-5">
          {" "}
          sign in to your account
        </h2>
        {/* login form  */}
        <LoginForm />
        <p className="p-2 mt-3">
          DO not have an account ?
          <Link href="/register" className="text-blue-500 text-xl">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
