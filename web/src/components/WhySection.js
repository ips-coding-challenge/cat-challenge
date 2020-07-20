import React from "react";
import image1 from "../assets/img/image 1.png";
import image2 from "../assets/img/image 2.png";
import image3 from "../assets/img/image 3.png";

function WhySection() {
  return (
    <section className="flex flex-col md:flex-row md:items-center mb-20">
      <div>
        <div className="md:w-3/5">
          <hr className="w-1/6 bg-text h-1 rounded-full mb-3" />
          <h2 className="text-4xl font-bold text-text mb-8">
            Why should you Have a cat ?
          </h2>
          <p className="leading-tight text-lg mb-4">
            Having a cat around you can actually trigger the release of calming
            chemicals in your body which lower your stress and anxiety levels
          </p>
          <button className="text-gray-600 capitalize mb-6 self-start outline-none border-none font-bold">
            Read more &rarr;
          </button>
        </div>
      </div>

      {/* Little gallery */}
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <img
          className="col-start-1 col-span-3 row-start-1 row-span-2"
          src={image2}
          alt=""
        />
        <img
          className="h-full col-start-4 col-span-2 row-start-1 row-span-4  object-cove"
          src={image3}
          alt=""
        />

        <img
          className="col-start-2 col-span-2 row-start-3 row-span-3"
          src={image1}
          alt=""
        />
      </div>
    </section>
  );
}

export default WhySection;
