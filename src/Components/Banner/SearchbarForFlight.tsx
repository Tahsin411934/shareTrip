import React, { useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineUpdate } from "react-icons/md";

const SearchBar: React.FC = () => {
  const [selectedCity1, setSelectedCity1] = useState<string>("");
  const [selectedCity2, setSelectedCity2] = useState<string>("");
  const [tripType, setTripType] = useState<string>("oneway");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [travelers, setTravelers] = useState<number>(1);
  const [price, setPrice] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("economy");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const database = [
    { city1: "dhaka", city2: "ctg", price: 1200, availableSeats: 5 },
    { city1: "ctg", city2: "cox", price: 1500, availableSeats: 5 },
    { city1: "ctg", city2: "sly", price: 1500, availableSeats: 5 },
  ];

  const cities = Array.from(
    new Set(database.flatMap((entry) => [entry.city1, entry.city2]))
  );

  const handleSearch = () => {
    const matchedEntry = database.find(
      (entry) =>
        (selectedCity1.toLowerCase() === entry.city1.toLowerCase() &&
          selectedCity2.toLowerCase() === entry.city2.toLowerCase()) ||
        (selectedCity1.toLowerCase() === entry.city2.toLowerCase() &&
          selectedCity2.toLowerCase() === entry.city1.toLowerCase())
    );

    if (matchedEntry) {
      if (
        departureDate &&
        (tripType === "oneway" ||
          (returnDate && new Date(departureDate) <= new Date(returnDate))) &&
        travelers <= matchedEntry.availableSeats
      ) {
        let totalCost = matchedEntry.price * travelers;

        // Class price increase
        if (selectedClass === "business") {
          totalCost += 300 * travelers;
        } else if (selectedClass === "first") {
          totalCost += 600 * travelers;
        }

        const tripInfo =
          tripType === "round"
            ? `${totalCost * 2
            } tk for a round trip with ${travelers} travelers in ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)
            } Class`
            : `${totalCost} tk for a one-way trip with ${travelers} travelers in ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)
            } Class`;

        setModalContent(tripInfo);
        setShowModal(true);
      } else if (travelers > matchedEntry.availableSeats) {
        setModalContent("Not enough seats available.");
        setShowModal(true);
      } else {
        setModalContent("Please select a valid date.");
        setShowModal(true);
      }
    } else {
      setModalContent("No results found.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Trip Type Selection */}
        <div className="mb-4 flex space-x-2">
          <label className={`p-2 rounded-md ${tripType === "oneway" ? "bg-blue-500 text-white" : "bg-blue-100"}`}>
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={() => setTripType("oneway")}
              className="mr-2"
            />
            One-way
          </label>
          <label className={`p-2 rounded-md ${tripType === "round" ? "bg-blue-500 text-white" : "bg-blue-100"}`}>
            <input
              type="radio"
              name="tripType"
              value="round"
              checked={tripType === "round"}
              onChange={() => setTripType("round")}
              className="mr-2"
            />
            Round Trip
          </label>
        </div>

        <div className="md:flex items-center gap-4 w-full md:w-auto">
          {/* Class Selection */}
          <div className="mb-4 w-full md:w-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border text-blue-800 text-semibold border-blue-100 p-2 rounded w-full"
            >
              <option value="economy">Economy Class</option>
              <option value="business">Business Class</option>
              <option value="first">First Class</option>
            </select>
          </div>

          {/* Traveler */}
          <div className="mb-4 w-full md:w-auto">
            <input
              type="number"
              value={travelers}
              onChange={(e) => {
                const value = e.target.value.replace(/^0+/, "");
                setTravelers(value ? Number(value) : 1);
              }}
              min={1}
              className="border bg-blue-100 border-gray-300 p-2 rounded w-full"
              placeholder="1 traveler"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-2 md:gap-4 mb-4">
        {/* First City Selection */}
        <select
          value={selectedCity1}
          onChange={(e) => setSelectedCity1(e.target.value)}
          className="border border-gray-300 p-2 md:col-span-5 rounded bg-white"
        >
          <option value="" disabled>
            Select first city
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>

        {/* Switch Icon */}
        <div className="flex items-center justify-center md:col-span-1">
          <GoArrowSwitch size={20} className="text-blue-500" />
        </div>

        {/* Second City Selection */}
        <select
          value={selectedCity2}
          onChange={(e) => setSelectedCity2(e.target.value)}
          className="border border-gray-300 p-2 md:col-span-5 rounded bg-white"
        >
          <option value="" disabled>
            Select second city
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>
      </div>


      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-2 md:gap-4 mb-4">
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="border border-gray-300 p-2  md:col-span-5 rounded w-full"
        />


        {/* Switch Icon */}
        <div className="flex items-center justify-center md:col-span-1">
          <MdOutlineUpdate size={20} className="text-blue-500" />
        </div>


        
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className={`${tripType === "oneway" ? "" : ""
            } border border-gray-300 md:col-span-5 p-2 rounded w-full`}
          disabled={tripType === "oneway"}
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Search
      </button>

      {/* Modal for search results */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-2">Search Results</h2>
            <p>{modalContent}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {price && (
        <div className="mt-4">
          <p className="text-lg">{price}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
