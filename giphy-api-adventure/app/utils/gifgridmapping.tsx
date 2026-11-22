import { Gif } from "../types/gif";
import Gifloader from "./getgifUrl";

export default function Gifgridmapping({ gifs }: { gifs: Gif[] }) {
    return (
        <div className="grid grid-cols-5">
            {gifs.map((gif) => (
                <div key={gif.id}>
                    <Gifloader gif={gif}></Gifloader>
                </div>
            ))}
        </div>
    )
}