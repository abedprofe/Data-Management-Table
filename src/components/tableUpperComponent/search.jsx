"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export default function Search() {
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const router = useRouter();
  let debounce;
  const handleSearchChange = (value) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const param = new URLSearchParams(searchParam);
      if (param.get("page")) {
        param.delete("page");
      }
      if (value !== "") {
        param.set("search", value.toString());
      } else {
        param.delete("search");
      }
      router.replace(`${pathName}?${param.toString()}`, { scroll: false });
    }, 500);
  };
  return (
    <>
      <Input
        type={"search"}
        className={"sm:w-[300px] text-sm"}
        placeholder={"Search by Id, Username"}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </>
  );
}
