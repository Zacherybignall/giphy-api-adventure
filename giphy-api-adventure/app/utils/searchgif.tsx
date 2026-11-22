//TODO: update to handle all GIF ewarch items , no need to have two
import { useEffect, useRef, useState } from "react";
import { Gif } from "../types/gif";
import Gifgridmapping from "./gifgridmapping";
import { debounce } from "es-toolkit";
import { Paginationitems } from "../types/paginationitems";


//since i render this page , have to have the inputs as props that are passed around
interface SearchgifProps {
    searchtext: string;
    paginationitems: Paginationitems;
}

export default function Searchgif({ searchtext, paginationitems }: SearchgifProps) {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [error, setError] = useState("");
    const [dataIsLoaded, setDataIsLoaded] = useState(false)

    const [totalCount, setTotalCount] = useState(paginationitems.total_count);
    // current page, starts from the prop and changes when the buttons are clicked
    const [offset, setOffset] = useState(paginationitems.offset);
    const { limit } = paginationitems;
    
    //useRef is a React Hook that lets you reference a value that’s not needed for rendering.
    const gifCache = useRef(new Map<string, Gif[]>());

    //useEffect is a React Hook that lets you synchronize a component with an external system.
    {/* dry (b/c i want to do the ramdom , which will need to reuse this)*/ }
    useEffect(() => {
        // th two stop old items from being pushed though.
        let ignore = false;
        const controller = new AbortController();

        // set up keys for this search 
        const key = JSON.stringify([searchtext, limit, offset]);
        const cachedGifs = gifCache.current.get(key);

        // fetchGifs can use the outer values no need to pass in paginationitems
        async function fetchGifs() {
            try {
                const apiKey = process.env.GIPHY_API_KEY ?? "Tpnn2BhpbUQHrskUMuJvPdxyehE7RuF8";
                const params = new URLSearchParams({
                    api_key: apiKey,
                    q: searchtext,
                    limit: limit.toString(),
                    offset: offset.toString(),
                    rating: "G",
                    lang: "en",
                });
                // TODO: make this a .env item 
                // random only returns one.
                const response = await fetch(
                    `https://api.giphy.com/v1/gifs/search?${params}`
                );

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const result = await response.json();
                if (!ignore) {
                    
                    setDataIsLoaded(true);
                    gifCache.current.set(key, result.data);
                    setGifs(result.data);
                    setTotalCount(result.pagination.total_count);
                    
                }

            } catch (err) {
                if (!ignore) setError(String(err));
            }
        }

        //waits 300 milliseconds before sending or re-sending a request out
        const debouncedFetch = debounce(fetchGifs, 300);
        debouncedFetch();

        return () => {
            ignore = true;
            controller.abort();
            debouncedFetch.cancel();
        };
        // haveing  [searchtext, offset, limit] allows the data to update and the funtion to update/re-run
    }, [searchtext, offset, limit]);
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <p>Please clear search bar and start again</p>
        </div>
    );
    //if (gifs.length === 0) return <p>Loading GIFs…</p>;
    if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait some time....</h1>
            </div>
        );
    }
    if (dataIsLoaded && (gifs.length !== 0)) {

        return (
            <div className="gif-grid">
                <Gifgridmapping
                    gifs={gifs}
                    hasPrev={offset > 0}
                    hasNext={offset + limit < totalCount}
                    onPrev={() => setOffset((o) => Math.max(0, o - limit))}
                    onNext={() => setOffset((o) => o + limit)}
                    count={offset}
                    total={totalCount}
                />
            </div>
        )
    }
};