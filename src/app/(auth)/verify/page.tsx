import { verificationTokenAction } from "@/actions/verification.action";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { VscError } from "react-icons/vsc";
interface verifyPageProps {
  searchParams: Promise<{ token: string }>;
}

const verifyPage = async ({ searchParams }: verifyPageProps) => {
  const currentSearchPrams = await searchParams;
  const result = await verificationTokenAction(currentSearchPrams.token);

  return (
    <div className="text-center">
      {result.success ? (
        <div className="flex items-center justify-center flex-col mb-4">
          <GoVerified className="text-green-700 text-8xl " />
          <h2 className="text-green-700 font-bold text-3xl">Email verified</h2>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col mb-4">
          <VscError className="text-red-700 text-8xl " />
          <h2 className="text-red-700 font-bold text-3xl">
            Email not verified
          </h2>
        </div>
      )}
      <Link href="/login" className="underline text-blue-400">Go to Login</Link>
    </div>
  );
};
export default verifyPage;
