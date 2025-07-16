"use server";

import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col justify-center items-center min-h-screen gap-6 p-2">
      <h1 className="w-fit mx-auto text-center sm:text-4xl text-xl">
        Welcome To the Data Management Table Home Page. <br />{" "}
      </h1>
      <Link href={"/table"} className="underline text-blue-600">
        Please Navigate to Our Data Table Page
      </Link>
      <Image src={"/data_table.png"} width={1100} height={1100} alt="" />
    </div>
  );
}
