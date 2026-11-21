export default function about() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm max-h-10">
        <div className="navbar-start">
          <h2 className="tooltip tooltip-right tooltip-start" data-tip="Scroll for more!">Tools</h2>
        </div>
        <div className="navbar-center">
        </div>
        <div className="navbar-end">
          <h2>Adventures</h2>
        </div>
      </div>
      <div className="join">
        <div className="join-item max-h-90">
          <div className="carousel carousel-vertical rounded-box max-h-85">
            <div id="item1" className="carousel-item border-base-content w-full card bg-base-100  text-center">
              <div className="card-body">
                <h2 className="card-title flex justify-center">daisyUI</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.</p>
              </div>
            </div>
            <div id="item1" className="carousel-item border-base-content w-full card bg-base-100  text-center">
              <div className="card-body">
                <h2 className="card-title flex justify-center">Tailwind</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.</p>
              </div>
            </div>
            <div id="item1" className="carousel-item border-base-content w-full card bg-base-100  text-center">
              <div className="card-body">
                <h2 className="card-title flex justify-center">Nextjs</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.</p>
              </div>
            </div>
            <div id="item1" className="carousel-item border-base-content w-full card bg-base-100  text-center">
              <div className="card-body">
                <h2 className="card-title flex justify-center">react</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.</p>
              </div>
            </div>
            <div id="item1" className="carousel-item border-base-content w-full card bg-base-100  text-center">
              <div className="card-body">
                <h2 className="card-title flex justify-center">loremipsum.io</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.</p>
              </div>
            </div>
          </div>

        </div>
        <div className="join-item p-2">
          <div className="join join-vertical lg:join-horizontal flex justify-around" >
            <div className="card flex flex-row bg-base-100 w-96 shadow-sm rounded-xl border-spacing-2" >
              <figure className="">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              </div>
            </div>
            <div className="card flex flex-row bg-base-100 w-96 shadow-sm  rounded-xl border-spacing-2">
              <figure className="">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                  alt="Cone"
                  className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              </div>
            </div>
          </div>
          <div className="join join-vertical lg:join-horizontal flex justify-around">
            <div className="card flex flex-row bg-base-100 w-96 shadow-sm  rounded-xl border-spacing-2">
              <figure className="">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                  alt="Cherry"
                  className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              </div>
            </div>
            <div className="card flex flex-row bg-base-100 w-96 shadow-sm rounded-xl border-spacing-2">
              <figure className="">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  alt="Movie"
                  className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
