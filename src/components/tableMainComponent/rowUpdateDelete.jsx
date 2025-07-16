"use client";

import { useContext, useState } from "react";
import { CalendarIcon, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { editData, individualDelete } from "@/app/api/users";
import { toast } from "sonner";
import { dataContext } from "@/context/dataContext";
import { useRouter } from "next/navigation";

export default function RowMutation({ prevData }) {
  const router = useRouter();
  const { allData, setAllData } = useContext(dataContext);
  const [role, setRole] = useState(prevData?.role || "");
  const [username, setUsername] = useState(prevData?.username || "");
  const [date, setDate] = useState(new Date(prevData?.joined_at) || "");

  const handleEdit = async (formData) => {
    const data = {
      username: formData.get("username"),
      role: formData.get("role"),
      joined_at: formData.get("joinedAt"),
    };
    const newData = await editData(data, prevData?.id);
    if (newData?.error) {
      toast.error(newData?.error, { position: "top-right" });
    } else {
      const modifiedData = allData?.map((d, i) => {
        if (d?.id === newData?.data?.id) {
          d["id"] = newData?.data?.id;
          d["username"] = newData?.data?.username;
          d["role"] = newData?.data?.role;
          d["joined_at"] = newData?.data?.joined_at;
        }
        return d;
      });
      setAllData(modifiedData);
    }
  };
  const handleDelete = async (id) => {
    const deleted = await individualDelete(id);
    if (deleted?.error) {
      toast.error(deleted?.error, { position: "top-right" });
    } else {
      router.refresh();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={17} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"flex flex-col gap-3"}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} className={"text-xs"}>
              Edit
            </Button>
          </SheetTrigger>
          <SheetContent className={"p-2"}>
            <SheetTitle>Update User Data</SheetTitle>
            <SheetDescription>{null}</SheetDescription>
            <form
              action={handleEdit}
              className="flex flex-col gap-4 justify-between"
            >
              <div>
                <label className="font-semibold text-sm">Username</label>
                <Input
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Change Username"
                  className={"text-sm"}
                />
              </div>
              <div>
                <label className="font-semibold text-sm">Role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>User Role</SelectLabel>
                      {["admin", "expert", "farmer"].map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input type="hidden" name="role" value={role} />
              </div>
              <div>
                <label className="font-semibold text-sm block">Joined At</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="text-xs">
                      <CalendarIcon size={15} className="mr-2" />
                      {date ? format(date, "MM-dd-yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      default
                      captionLayout="dropdown"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <input
                  type="hidden"
                  name="joinedAt"
                  value={date ? format(date, "yyyy-MM-dd") : ""}
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </SheetContent>
        </Sheet>
        <Button
          variant={"ghost"}
          className={"text-xs"}
          onClick={() => handleDelete(prevData?.id)}
        >
          Delete
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
