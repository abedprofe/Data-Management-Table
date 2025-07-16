"use client";
import { createContext, useState, useMemo, useEffect } from "react";
export const dataContext = createContext(null);

export default function DataContextProvider({ children }) {
  const [allData, setAllData] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const view = useMemo(() => {
    return new Set(allData.map((it) => it.id).filter((id) => selected.has(id)));
  }, [allData, selected]);

  return (
    <dataContext.Provider
      value={{
        allData,
        setAllData,
        selected,
        setSelected,
        view,
      }}
    >
      {children}
    </dataContext.Provider>
  );
}
