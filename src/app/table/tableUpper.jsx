import Access from "@/components/tableUpperComponent/access";
import JoinedAt from "@/components/tableUpperComponent/joinedAt";
import Search from "@/components/tableUpperComponent/search";

export default function TableUpper({ searchParam }) {
  return (
    <div className="w-full flex flex-wrap-reverse justify-between gap-3">
      <div className="flex flex-wrap gap-3">
        <Search search={searchParam?.search || ""} />
        <Access roleinQuery={searchParam?.role || ""} />
        <JoinedAt createdAtinQuery={searchParam?.createdAt || ""} />
      </div>
      <div>
        <p className="p-1 border-2 rounded-md">kicu hobe</p>
      </div>
    </div>
  );
}
