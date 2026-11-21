import Image from "next/image";
import Cards from "./pages/cards";
import About from "./pages/about";
import Github from "./pages/github";

export default function Home() {
  return (
    <div className="">
      <div className="tabs tabs-lift">
        <input type="radio" name="my_tabs_3" className="tab" aria-label="About Me" />
        <div className="tab-content bg-base-100 border-base-300 p-6"><About /></div>

        <input type="radio" name="my_tabs_3" className="tab" aria-label="Giphy" defaultChecked />
        <div className="tab-content bg-base-100 border-base-300 p-6"><Cards /></div>

        <input type="radio" name="my_tabs_3" className="tab" aria-label="Git" />
        <div className="tab-content bg-base-100 border-base-300 p-6"><Github /></div>
      </div>
    </div>
  );
}
