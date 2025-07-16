import TableDatas from "@/components/tableMainComponent/tableDatas";
import TableHeaders from "@/components/tableMainComponent/tableHeaders";

import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";

export default function TableMain({ userData }) {
  return (
    <div className="border rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaders />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableDatas userData={userData} />
        </TableBody>
      </Table>
    </div>
  );
}
