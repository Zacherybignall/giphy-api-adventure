// This was the POC to get things ready

//idea is to test all items out then split where needed

//feach data from : https://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY&limit=25&offset=0&rating=G&lang=en
'use client';
import { useEffect, useState } from "react";
// place in own file , folder type?
type Gif = {
  id: string;
  title: string;
  url: string
  images: {
    fixed_width: {
      url: string;
    };
  };
};
// needs to make into a hook, that also tells the user
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);

  } catch {

  }
};

export default function Cards() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState("");
  //useEffect is a React Hook that lets you synchronize a component with an external system.
  useEffect(() => {
    async function fetchGifs() {
      try {
        //TODO: do not allow Key into Git , make this a .env item
        const apiKey = "API_KEY";
        const params = new URLSearchParams({
          api_key: apiKey,
          limit: "25",
          offset: "0",
          rating: "G",
          lang: "en",
        });
        // TODO: make this a .env item 
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?${params}`
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();
        setGifs(result.data);

      } catch (err) {

      }
    }

    fetchGifs();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (gifs.length === 0) return <p>Loading GIFs…</p>;

  return (
    <div className="gif-grid">
      {/* TODO: go with map?, works */}
      {gifs.map((gif) => (
        <div key={gif.id}>
          <img
            key={gif.id}
            src={gif.images.fixed_width.url}
            alt={gif.title || "Trending GIF"}
          />
          <button onClick={() => copyText(gif.url)}>
            Copy to clip
          </button>
        </div>

      ))}
    </div>
  );
}
