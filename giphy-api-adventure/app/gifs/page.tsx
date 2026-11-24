'use client'
import { Suspense, useEffect, useState } from "react";
import Searchgif from "../utils/searchgif";
import { Paginationitems } from "../types/paginationitems";

function UrlsearchContent() {

    const [q, setQ] = useState<string>("");
    // Allows the window to render 
    useEffect(() => {
        const searchParams = new URL(window.location.href);
        setQ(searchParams.searchParams.get("q") ?? "");

    }, []);
    if (q != "") {
        const pagen: Paginationitems = { limit: 5, offset: 0, total_count: 0, count: 0 }
        return (
            <div>
                <Searchgif searchtext={q} paginationitems={pagen}></Searchgif>
            </div>
        );

    }
}

export default function Urlsearch() {
    return (
        <div>
            <div>
                <div className="flex justify-center glass rounded-selector ">How to use : Add "?q=" to the end of the URL followed by what you want to seatch for</div>
            </div>
            {/* without get Error: Route "/gifs": Next.js encountered URL data `useSearchParams()` in a Client Component outside of `<Suspense>`. */}
            <Suspense fallback={<div>Loading...</div>}>
                <UrlsearchContent />
            </Suspense>
        </div>
    );
}