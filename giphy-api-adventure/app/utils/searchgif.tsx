
import { useEffect, useState } from "react";
import { Gif } from "../types/gif";
import Gifloader from "./getgifUrl";
import Gifgridmapping from "./gifgridmapping";

export default function Searchgif({searchtext}:{searchtext: string}) {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [error, setError] = useState("");
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    //useEffect is a React Hook that lets you synchronize a component with an external system.
    // copuld update to use axios library
    {/* dry */}
    useEffect(() => {
        async function fetchGifs() {
            try {
                //TODO: do not allow Key into Git , make this a .env item
                const apiKey = "";
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
                setDataIsLoaded(true)

                setGifs(result.data);

            } catch (err) {
                console.log(err)
            }
        }

        fetchGifs();
    }, []);
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