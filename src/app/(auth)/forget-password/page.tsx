import ForgetPasswordForm from "./forgetPasswordForm";

export default function forgotPasswordPage() {
  return (
    <section className="w-2/5">
      <div className=" bg-amber-100 rounded-2xl m-auto p-5">
        <h2 className="text-2xl text-slate-300 text-center mb-5">
          {" "}
          Forgot Password{" "}
        </h2>
        <ForgetPasswordForm />
      </div>
    </section>
  );
}
