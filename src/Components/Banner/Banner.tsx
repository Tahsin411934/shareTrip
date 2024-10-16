import React from "react";
import SearchbarForFlight from "./SearchbarForFlight";

const Banner = () => {
  return (
    <div>
    <div className="relative w-full h-96 overflow-hidden bg-black font-Montserrat">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken the video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full lg:w-[60%] text-white  px-4">
        {/* Your content here */}
        <h1 className="md:text-4xl text-2xl ">Welcome to <span className="font-bold">ShareTrip!</span> </h1>
        <p className="mt-2 text-base font-semibold md:text-xl">
        Find Flights, bus, Hotels, Visa & Holidays
        </p>
      </div>
    </div>
    <SearchbarForFlight></SearchbarForFlight>
    </div>
  );
};

export default Banner;
