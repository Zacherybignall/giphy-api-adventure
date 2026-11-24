'use client'
import { Suspense, useEffect, useState } from "react";
import Searchgif from "./utils/searchgif";
import { Paginationitems } from "../app/types/paginationitems";
import Ramdomgif from "./utils/ramdomgif";
//function may need to change but starting point
function Loadgif({ searchtext }: { searchtext: string }) {
  if (searchtext != "") {
    const pagei: Paginationitems = { limit: 5, offset: 0, total_count: 0, count: 0 }
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Searchgif searchtext={searchtext} paginationitems={pagei}></Searchgif>
        </Suspense>
      </div>
    );
  }
  else {

    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Ramdomgif></Ramdomgif>
        </Suspense>

      </div>
    );
  }
}
export default function Giphy() {
  const [searchtext, setSearchtext] = useState<string>("");
  // Allows the window to render 
  useEffect(() => {
    const searchParams = new URL(window.location.href);
    setSearchtext(searchParams.searchParams.get("q") ?? "");
  }, []);


  return (
    <div className="p-2 flex items-center flex-col">
      <div>Type something in the searh bar to get started Or: Add "?q=" to the end of the URL followed by what you want to seatch for</div>
      <div>Click a GIF to copy it</div>
      <input
        className="input"
        value={searchtext}
        onChange={e => setSearchtext(e.target.value)}
      />
      <Loadgif searchtext={searchtext}></Loadgif>
    </div>
  )
}
