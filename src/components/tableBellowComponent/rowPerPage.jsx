"use client";

import { memo, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RowPerPage = ({ limit }) => {
  const [row, setRow] = useState(10);
  const pathName = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();
  const rowOptions = useMemo(() => [10, 20, 30, 40], []);
  function handleRowPerPage(val) {
    const param = new URLSearchParams(searchParam);
    let page = param.get("page") || 1;
    page = Math.floor((page * row) / val) || 1;
    param.set("page", page);
    if (val > 10) {
      param.set("limit", val);
    } else {
      param.delete("limit");
    }
    return router.replace(`${pathName}?${param.toString()}`, { scroll: false });
  }
  return (
    <>
      <Select
        value={limit ? parseInt(limit) : 10}
        onValueChange={(value) => (setRow(value), handleRowPerPage(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Row in Table</SelectLabel>
            {rowOptions?.map((val, i) => (
              <SelectItem key={`${i}-row-per-page`} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default memo(RowPerPage);
