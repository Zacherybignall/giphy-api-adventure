'use client'
import { useState } from "react";
import Searchgif from "./utils/searchgif";
import Get25ramgif from "./utils/get25ramgif";
//function may need to change but starting point
function Loadgif({searchtext}: { searchtext: string }) {
  if (searchtext != "") {
     return (
      <div>
        <Searchgif searchtext={searchtext}></Searchgif>
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
