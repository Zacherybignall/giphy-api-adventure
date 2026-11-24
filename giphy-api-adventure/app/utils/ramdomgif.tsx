//TODO: update to handle all GIF ewarch items , no need to have two
import { useEffect, useRef, useState } from "react";
import { Gif } from "../types/gif";
import Gifgridmapping from "./gifgridmapping";



export default function Ramdomgif() {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [error, setError] = useState<string>("");
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false)
   
    //useRef is a React Hook that lets you reference a value that’s not needed for rendering.
    const gifCache = useRef(new Map<string, Gif[]>());
    //useEffect is a React Hook that lets you synchronize a component with an external system.
    useEffect(() => {
        // these two stop old items from being pushed though.
        var ignore = false;
        const controller = new AbortController();
        // set up keys for this search 
        const key = JSON.stringify(Date.now());
        const cachedGifs = gifCache.current.get(key);

        // fetchGifs can use the outer values no need to pass in paginationitems
        async function fetchGifs() {
            try {
                const apiKey ="";
                const params = new URLSearchParams({
                    api_key: apiKey,
                    rating: "G",
                    lang: "en",
                });
                const giflist3: Gif[] = [];
                // This is a way for each request to make there own task.
                const results = await Promise.all(
                    Array.from({ length: 5 }, async () => {
                        const response = await fetch(
                            `https://api.giphy.com/v1/gifs/random?${params}`
                        );

                        if (response.status === 429) {
                            throw new Error("Too many requests. Please wait a moment and try again.");
                        }
                        if (!response.ok) {
                            throw new Error(`Request failed: ${response.status}`);
                        }

                        const result = await response.json();
                        return result.data;
                    })
                );

                // The "..." for each item to be pushed into  giflist3
                if (!ignore) {
                    giflist3.push(...results);
                }
                // Once I have more three load the data 
                if (giflist3.length >= 3) {
                    setDataIsLoaded(true);
                    setGifs(giflist3);
                    gifCache.current.set(key, giflist3);
                }

            } catch (err) {
                if (!ignore) setError(String(err));


            }
        }

        //waits 300 milliseconds before sending or re-sending a request out
        fetchGifs()

        return () => {
            ignore = true;
            controller.abort();
        };
        // haveing  [searchtext, offset, limit] allows the data to update and the funtion to update/re-run
    }, []);
    if (error) return (
        <div>
            <p>Problem: {error}</p>
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
    if (dataIsLoaded && (gifs.length >= 3)) {
        return (
            <div>
                <Gifgridmapping
                    gifs={gifs}
                    hasPrev={false}
                    hasNext={false}
                    onPrev={() => null}
                    onNext={() => null}
                    count={0}
                    total={0}
                    hidenav={true}
                />
            </div>
        )
    }
};