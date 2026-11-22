'use client'
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Searchgif from "../utils/searchgif";
import { Paginationitems } from "../types/paginationitems";

function UrlsearchContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") ?? "";
    if (q != "") {
        const pagei: Paginationitems = { limit: 5, offset: 0, total_count: 0, count: 0 }
        return (
            <div>
                <Searchgif searchtext={q} paginationitems={pagei}></Searchgif>
            </div>
        );

    }
}

export default function Urlsearch() {
    return (
        <div>
            <div>
                <div className="flex justify-center glass rounded-selector ">How to use : Add "?q=" to the end of the URL followed by what you want to seatch for !</div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <UrlsearchContent />
            </Suspense>
        </div>
    );
}