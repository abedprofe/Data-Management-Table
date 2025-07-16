"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Pagination({ page, numOfPage }) {
  const [currPage, setCurrPage] = useState(Number(page) || 1);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    let numericPage = Number(page) || 1;
    if (numericPage > numOfPage) numericPage = numOfPage;
    if (numericPage < 1) numericPage = 1;
    setCurrPage(numericPage);
  }, [page]);

  const updateURL = (newPage) => {
    const param = new URLSearchParams(searchParams.toString());
    if (newPage > 1) {
      param.set("page", newPage.toString());
    } else {
      param.delete("page");
    }
    router.replace(`${pathName}?${param.toString()}`, { scroll: false });
  };

  const handleChange = (nextPage) => {
    updateURL(nextPage);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        onClick={() => handleChange(1)}
        disabled={currPage <= 1}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => handleChange(currPage - 1 <= 1 ? 1 : currPage - 1)}
        disabled={currPage <= 1}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"outline"}
        onClick={() =>
          handleChange(
            currPage + 1 <= Number(numOfPage) ? currPage + 1 : currPage
          )
        }
        disabled={currPage >= numOfPage}
      >
        <ChevronRight />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => handleChange(numOfPage)}
        disabled={currPage >= numOfPage}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
}
