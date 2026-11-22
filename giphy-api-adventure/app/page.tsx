'use client'
import { Suspense, useState } from "react";
import Searchgif from "./utils/searchgif";
import Get25ramgif from "./utils/get25ramgif";
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
  const [searchtext, setSearchtext] = useState("");


  return (
    <div className="p-2 flex items-center flex-col">
      <div> Type something in the searh bar to get started</div>
      <input
        className="input"
        value={searchtext}
        onChange={e => setSearchtext(e.target.value)}
      />
      <Loadgif searchtext={searchtext}></Loadgif>
    </div>
  )
}
