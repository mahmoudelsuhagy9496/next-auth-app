import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth.action";
export default async function ProfilePage() {
  const session = await auth();
  console.log(session);

  return (
    <>
      {" "}
      {session?.user && (
        <><div>
          <div className="w-full h-6 m-auto"><p >{JSON.stringify(session)}</p></div> 
          <div  className="w-full h-6 m-5">Welcome to Profile Page ya {session?.user?.name} </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className=" py-2 px-3 bg-amber-200 caret-amber-900 m-2 rounded-2xl"
            >
              {" "}
              log out
            </button>
          </form>
          </div>
          <br />
        </>
      )}
    </>
  );
}
