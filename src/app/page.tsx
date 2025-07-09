import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div>
        <h1 className="text-5xl text-cyan-400 font-bold">
          {" "}
          welcome to next auth course
        </h1>
        <Link className=" text-blue-500 text-2xl font-semibold mt-7 block " href={`/login`}>Go to Login Page</Link>
      </div>
    </section>
  );
}
