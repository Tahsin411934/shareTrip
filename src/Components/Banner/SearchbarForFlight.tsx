import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [selectedCity1, setSelectedCity1] = useState<string>("");
  const [selectedCity2, setSelectedCity2] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [travelers, setTravelers] = useState<number>(1);
  const [price, setPrice] = useState<string | null>(null);

  // Mock database with multiple entries
  const database = [
    {
      city1: "dhaka",
      city2: "ctg",
      price: 1200,
      availableSeats: 5,
    },
    {
      city1: "ctg",
      city2: "cox",
      price: 1500,
      availableSeats: 5,
    },
  ];

  const handleSearch = () => {
    const matchedEntry = database.find(
      (entry) =>
        (selectedCity1.toLowerCase() === entry.city1.toLowerCase() &&
          selectedCity2.toLowerCase() === entry.city2.toLowerCase()) ||
        (selectedCity1.toLowerCase() === entry.city2.toLowerCase() &&
          selectedCity2.toLowerCase() === entry.city1.toLowerCase())
    );

    if (matchedEntry) {
      if (departureDate && travelers <= matchedEntry.availableSeats) {
        let totalCost = matchedEntry.price * travelers;
        if (returnDate) {
          // Double the price for a round trip
          totalCost *= 2;
          setPrice(
            `${totalCost} tk for a round trip with ${travelers} travelers`
          );
        } else {
          setPrice(
            `${totalCost} tk for a one-way trip with ${travelers} travelers`
          );
        }
      } else if (travelers > matchedEntry.availableSeats) {
        setPrice("Not enough seats available.");
      } else {
        setPrice("Please select a date.");
      }
    } else {
      setPrice("No results found.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Price</h2>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter first city"
          value={selectedCity1}
          onChange={(e) => setSelectedCity1(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter second city"
          value={selectedCity2}
          onChange={(e) => setSelectedCity2(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-4">
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          placeholder="Return Date"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Travelers</label>
        <input
          type="number"
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          min={1}
          max={Math.max(...database.map((entry) => entry.availableSeats))}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Search
      </button>

      {price && (
        <div className="mt-4">
          <p className="text-lg">{price}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
