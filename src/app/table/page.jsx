import TableBellow from "./tableBellow";
import TableMain from "./tableMain";
import TableUpper from "./tableUpper";
import { usersData } from "../api/users";
import DataContextProvider from "@/context/dataContext";

export default async function TablePage(props) {
  const searchParam = await props.searchParams;
  const userData = await usersData(searchParam);
  return (
    <div className="w-full min-h-screen">
      <p className="w-fit mx-auto">This is User Management Table</p>
      <div className="w-full sm:p-4 p-2 flex flex-col justify-center items-center gap-5">
        <TableUpper searchParam={searchParam} />
        <DataContextProvider>
          <TableMain userData={userData?.data ? userData.data : []} />
          <TableBellow
            searchParam={searchParam}
            numOfPage={userData?.numofPage ? userData.numofPage : 100}
          />
        </DataContextProvider>
      </div>
    </div>
  );
}
