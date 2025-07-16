"use client";

import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { useContext, useEffect } from "react";
import { dataContext } from "@/context/dataContext";
import RowMutation from "./rowUpdateDelete";

export default function TableDatas({ userData }) {
  const { allData, setAllData, setSelected, view } = useContext(dataContext);

  useEffect(() => {
    setAllData(userData);
  }, [userData]);

  return (
    <>
      {allData &&
        allData.map((data, i) => (
          <TableRow key={`${data?.id}`}>
            <TableCell>
              <Checkbox
                checked={view.has(data.id)}
                onCheckedChange={() =>
                  setSelected((prev) => {
                    const newSet = new Set(prev);
                    newSet.has(data.id)
                      ? newSet.delete(data.id)
                      : newSet.add(data.id);
                    return newSet;
                  })
                }
              />
            </TableCell>
            {Object.entries(data).map(([key, val]) => (
              <TableCell key={`${key}-${data?.id}`} className={"px-2.5"}>
                {val}
              </TableCell>
            ))}
            <TableCell key={`action-${data?.id}`} className={"p-1"}>
              <RowMutation prevData={data} />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
