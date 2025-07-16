import NumberOfSelected from "@/components/tableBellowComponent/numofSelected";
import Pagination from "@/components/tableBellowComponent/pagination";
import RowPerPage from "@/components/tableBellowComponent/rowPerPage";

export default function TableBellow({ searchParam, numOfPage }) {
  const currentRowPerPage = searchParam?.limit;
  const page = searchParam?.page;
  return (
    <div className="w-full flex flex-wrap-reverse justify-between items-center gap-4">
      <NumberOfSelected />
      <div className="flex gap-2 items-center">
        <p className="text-sm">Row Per Page</p>
        <RowPerPage limit={currentRowPerPage} />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm">
          Page{" "}
          {Number(page) ? (Number(page) > numOfPage ? numOfPage : page) : 1} of{" "}
          {numOfPage || 100}
        </p>
        <Pagination page={page} numOfPage={numOfPage} />
      </div>
    </div>
  );
}
