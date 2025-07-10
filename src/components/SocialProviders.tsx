import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
type Provider = "github" | "google";

const socialLoginHandler = (provider: Provider) => {
  signIn(provider, { redirectTo: "/profile" });
};
export default function SocialProviders() {
  return (
    <div className=" w-full flex justify-items-center gap-6 mb-6 ">
      <div className="rounded border bg-blue-100 hover:bg-blue-300 cursor-pointer text-2xl w-1/2 px-4 py-2 flex items-center justify-center ">
        <FcGoogle className="text-4xl " />
      </div>
      <div onClick={()=>socialLoginHandler("github")} className="rounded border bg-slate-100 hover:bg-slate-300 cursor-pointer text-2xl w-1/2 px-4 py-2 flex items-center justify-center ">
        <FaGithub className="text-4xl" />
      </div>
    </div>
  );
}
