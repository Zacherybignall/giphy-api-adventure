import { Gif } from "../types/gif";
import Gifloader from "./getgifUrl";

interface GifgridmappingProps {
    gifs: Gif[];
    hasPrev: boolean;
    hasNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    total: number;
    count: number;
    hidenav: boolean
}

export default function Gifgridmapping({
    gifs,
    hasPrev,
    hasNext,
    onPrev,
    onNext,
    total,
    count,
    hidenav
}: GifgridmappingProps) {
    return (
        <div className="flex items-center flex-col">
            <div className="grid grid-cols-5 items-center">
                {gifs.map((gif) => (
                    <div key={gif.id}>
                        <Gifloader gif={gif} />
                    </div>
                ))}
            </div>
            <div className="join" hidden={hidenav}>
                {/* on click is have onPrev |  onNext fun a fuynction on Searchgif to get the next set of items*/}
                <button className="join-item btn" onClick={onPrev} disabled={!hasPrev}>«</button>
                <button className="join-item btn btn-ghost">{count} out of {total}</button>
                {/* have the disabled so it onlys shows if the offset is more then 0  */}
                <button className="join-item btn" onClick={onNext} disabled={!hasNext} >»</button>
            </div>
        </div>
    );
}
