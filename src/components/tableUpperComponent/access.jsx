"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Access({ roleinQuery }) {
  const [role, setRole] = useState([]);
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (roleinQuery) {
      const allrole = roleinQuery?.split(",");
      return setRole(allrole);
    }
    return setRole([]);
  }, [roleinQuery]);

  function changeUrl(item) {
    const param = new URLSearchParams(searchParam);
    if (!item.length) {
      param.delete("role");
    } else {
      param.set("role", item.join(","));
    }
    router.replace(`${pathName}?${param.toString()}`, { scroll: false });
  }

  function handlechange(item) {
    if (role.includes(item)) {
      const filteredRole = role.filter((val) => val !== item);
      changeUrl(filteredRole);
    } else {
      changeUrl([...role, item]);
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Eye />
            <span>Role</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>User Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {["admin", "expert", "farmer"].map((item, i) => (
            <DropdownMenuCheckboxItem
              checked={role.includes(item)}
              onCheckedChange={() => handlechange(item)}
              key={`rolefilter-${item}-${i}`}
            >
              {item}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
