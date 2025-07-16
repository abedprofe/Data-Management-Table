"use server";
import data from "./mock_users.json";
let maindata = [...data];
export async function usersData({
  limit,
  page,
  search,
  role,
  createdAt,
  sort,
}) {
  let result = maindata;
  const newLimit = Number(limit) || 10;
  let pageNum = Number(page) || 1;
  const parsedSort = sort ? JSON.parse(sort) : null;
  const roleList = role?.split(",") || null;
  const dateRange = createdAt?.split(",")?.map(Number) || null;

  try {
    if (search?.trim()) {
      const s = search.toLowerCase().trim();
      result = result.filter((u) => u.username?.toLowerCase()?.includes(s));
    }

    if (roleList) {
      result = result.filter((u) => roleList.includes(u.role));
    }

    if (dateRange && dateRange.length === 2) {
      result = result.filter((u) => {
        const ts = new Date(u.joined_at).getTime();
        return ts >= dateRange[0] && ts <= dateRange[1];
      });
    }

    if (parsedSort?.id) {
      const { id, desc } = parsedSort;
      result = [...result].sort((a, b) => {
        let aValue = a[id];
        let bValue = b[id];

        if (id === "joined_at") {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        } else {
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
        return 0;
      });
    }

    const maxPage = Math.ceil(result.length / newLimit);
    if (pageNum > maxPage) pageNum = maxPage;
    if (pageNum < 1) pageNum = 1;

    const start = (pageNum - 1) * newLimit;
    const sliceOfData = result.slice(start, start + newLimit);

    return {
      data: sliceOfData,
      numofPage: maxPage,
    };
  } catch (e) {
    return {
      error: "Something went wrong",
      data: [],
      numofPage: 1,
    };
  }
}

export async function deleteBulkData(view) {
  try {
    maindata = maindata?.filter((d) => !view?.has(d?.id));
    return {
      data: [],
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      data: [],
    };
  }
}

export async function editData(data, id) {
  try {
    const date = data?.joined_at?.split("-");
    const formatedData = `${date[1]}/${date[2]}/${date[0]}`;
    for (const d of maindata) {
      if (d?.id === id) {
        d["username"] = data?.username || d?.username;
        d["role"] = data?.role || d?.role;
        d["joined_at"] = formatedData || d?.joined_at;
        return {
          data: d,
        };
      }
    }

    throw Error("No id found");
  } catch (error) {
    return {
      error: "Something went wrong",
      data: [],
    };
  }
}

export async function individualDelete(id) {
  try {
    maindata = maindata?.filter((d) => d.id != id);
    return { id };
  } catch (error) {
    return {
      error: "Something went wrong",
      data: [],
    };
  }
}
