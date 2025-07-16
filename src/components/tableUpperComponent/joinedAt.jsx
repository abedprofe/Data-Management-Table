"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function JoinedAt({ createdAtinQuery }) {
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const router = useRouter();
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    if (createdAtinQuery) {
      const dateinquery = createdAtinQuery.split(",");
      const from = new Date(Number(dateinquery[0]));
      const to = new Date(Number(dateinquery[1]));
      return setDate({ from: from, to: to });
    }
    return setDate(undefined);
  }, [createdAtinQuery]);
  function handleDate(date) {
    const param = new URLSearchParams(searchParam);
    if (date) {
      const createdAt = `${date?.from?.getTime()},${date?.to?.getTime()}`;
      param.set("createdAt", createdAt);
      return router.replace(`${pathName}?${param.toString()}`);
    }
    param.delete("createdAt");
    return router.replace(`${pathName}?${param.toString()}`);
  }
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>
            <CalendarIcon />
            {date?.from && date?.to
              ? `${format(date.from, "PP")} -  ${format(date.to, "PP")}`
              : "JoinedAt"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={"w-full"}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => handleDate(e)}
            numberOfMonths={1}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
