//TODO: update to handle all GIF ewarch items , no need to have two
import { useEffect, useRef, useState } from "react";
import { Gif } from "../types/gif";
import Gifgridmapping from "./gifgridmapping";



export default function Ramdomgif() {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [error, setError] = useState<string>("");
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false)
    const numberofRam: number = 5


    //useRef is a React Hook that lets you reference a value that’s not needed for rendering.
    const gifCache = useRef(new Map<string, Gif[]>());
    const apiKey = process.env.GIPHY_API_KEY ?? "";
    //useEffect is a React Hook that lets you synchronize a component with an external system.
    useEffect(() => {
        // these two stop old items from being pushed though.
        let ignore = false;
        const controller = new AbortController();
        async function fetchGifs() {
            try {
                const response = await fetch("/api/random-gifs", {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    // getting the json to the sever message , if it is a custom one 
                    const body = await response.json();
                    console.log(body)
                    throw new Error(body.error ?? `Request failed: ${response.status}:${response.statusText}`)
                }

                if (!ignore) {
                    const datajson = await response.json();
                    setDataIsLoaded(true);
                    setGifs(datajson);
                }
            } catch (error) {
                setError(String(error))}
        }
        fetchGifs()
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