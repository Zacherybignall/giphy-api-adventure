//TODO: update to handle all GIF ewarch items , no need to have two
import { useEffect, useState } from "react";
import { Gif } from "../types/gif";
import Gifgridmapping from "./gifgridmapping";
import { debounce } from "es-toolkit";

export default function Searchgif({ searchtext }: { searchtext: string }) {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [error, setError] = useState("");
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    //useEffect is a React Hook that lets you synchronize a component with an external system.
    // copuld update to use axios library
    {/* dry */ }
    useEffect(() => {
        // th two stop old items from being pushed though.
        let ignore = false;
        const controller = new AbortController();
        
        async function fetchGifs() {
            try {
                const apiKey = process.env.GIPHY_API_KEY ?? "";
                const params = new URLSearchParams({
                    api_key: apiKey,
                    q: searchtext,
                    limit: "25",
                    offset: "0",
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
                    setGifs(result.data);
                    setDataIsLoaded(true);
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
        // haveing  [searchtext] allows the box to be udpated
    }, [searchtext]);
    if (error) return <p>Error: {error}</p>;
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
                <Gifgridmapping gifs={gifs}></Gifgridmapping>
            </div>
        )
    }
};