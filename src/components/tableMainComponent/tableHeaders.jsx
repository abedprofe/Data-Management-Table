"use client";

import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell } from "../ui/table";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  EyeOffIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { dataContext } from "@/context/dataContext";

export default function TableHeaders() {
  const { allData, setSelected, view } = useContext(dataContext);
  const [sort, setSort] = useState({});
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const router = useRouter();

  function handleSortOption(item, bool) {
    item = item === "joined at" ? "joined_at" : item;
    const param = new URLSearchParams(searchParam);
    if (sort?.id === item && sort?.desc === bool) {
      setSort({});
      param.delete("sort");
    } else {
      setSort({ id: item, desc: bool });
      param.set("sort", JSON.stringify({ id: item, desc: bool }));
    }
    router.replace(`${pathName}?${param.toString()}`, { scroll: false });
  }

  return (
    <>
      <TableCell>
        <Checkbox
          checked={allData.length > 0 && allData.every((d) => view.has(d.id))}
          onCheckedChange={() => {
            setSelected((prev) => {
              const newSet = new Set(prev);
              const allIds = allData.map((d) => d.id);
              const allSelected = allIds.every((id) => newSet.has(id));
              allIds.forEach((id) =>
                allSelected ? newSet.delete(id) : newSet.add(id)
              );
              return newSet;
            });
          }}
        />
      </TableCell>
      {["Id", "Username", "Role", "Joined At", "Action"].map((item, i) => (
        <TableCell className={"p-0.5"} key={`${item}-tablehead`}>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={"flex items-center p-2 gap-3 font-medium rounded-md"}
            >
              <span>{item}</span>
              <ChevronsUpDown className="text-gray-500" size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"flex flex-col gap-1.5"}>
              {item !== "Role" && item !== "Action" && (
                <>
                  <DropdownMenuCheckboxItem
                    className={"flex justify-between"}
                    checked={
                      item === "Joined At"
                        ? sort?.id === "joined_at" && sort?.desc === false
                        : sort?.id === item.toLowerCase() &&
                          sort?.desc === false
                    }
                    onCheckedChange={() =>
                      handleSortOption(item.toLowerCase(), false)
                    }
                  >
                    <span>Asc</span>
                    <ChevronUp />
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    className={"flex justify-between"}
                    checked={
                      item === "Joined At"
                        ? sort?.id === "joined_at" && sort?.desc === true
                        : sort?.id === item.toLowerCase() && sort?.desc === true
                    }
                    onCheckedChange={() =>
                      handleSortOption(item.toLowerCase(), true)
                    }
                  >
                    <span>Desc</span>
                    <ChevronDown />
                  </DropdownMenuCheckboxItem>
                </>
              )}
              <DropdownMenuCheckboxItem className={"flex justify-between"}>
                <span>Hide</span>
                <EyeOffIcon />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      ))}
    </>
  );
}
