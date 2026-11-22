import { useEffect, useRef, useState } from "react";
import { Gif } from "../types/gif";

export default function Gifloader({ gif }: { gif: Gif }) {
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  // Clear any pending timer if the component unmounts
  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);

      // Restart the 3-second timer if the user clicks again
      window.clearTimeout(timerRef.current);
      setShowToast(true);
      timerRef.current = window.setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div >
            <video
              onClick={() => copyText(gif.url)}
              src={gif.images.original_mp4.mp4}
              autoPlay
              loop
              muted
              playsInline
              aria-label={gif.title || "Trending GIF"}
            />
          </div>
        </div>
      </div>
      {/*  This may need to be a custom hook or context  */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Link copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}
