import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="p-10 my-5 bg-lime-200 text-neutral-950 text-xl hover:bg-lime-400">Hello world</h1>
      <Link href="/auth" className="hey">Users</Link>
    </main>
  );
}
