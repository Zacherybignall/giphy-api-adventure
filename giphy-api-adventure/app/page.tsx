'use client'
import { useState } from "react";
import Searchgif from "./utils/searchgif";
import Get25ramgif from "./utils/get25ramgif";
import { Paginationitems } from "../app/types/paginationitems";
//function may need to change but starting point
function Loadgif({searchtext}: { searchtext: string }) {
  if (searchtext != "") {
    const pagei : Paginationitems = {limit :3,offset:0,total_count:0,count:0}
     return (
      <div>
        <Searchgif searchtext={searchtext} paginationitems={pagei}></Searchgif>
      </div>
    );
  }
  else {
    // show trending , top 25 (for now)
    return (
      <div>
        <Get25ramgif></Get25ramgif>
      </div>
    );
  }
}
export default function Giphy() {
  const [searchtext, setSearchtext] = useState("");
  
  
  return (
    <div className="p-2">
      <input
          className="input"
          value={searchtext}
          onChange={e => setSearchtext(e.target.value)}
        />
    <Loadgif searchtext={searchtext}></Loadgif>
  </div>
  )
}
