"use client";

import { Flag, Users } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Host {
  name: string;
}

interface Listing {
  host: Host;
  description: string;
}

interface DetailsProps {
  id: string | number;
}

const Book: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);

  return (
    <div className="rounded-lg border shadow p-6 w-96 flex flex-col gap-8">
      <div className="text-2xl font-semibold">
        $200/<span className="text-sm">night</span>
      </div>
      <div>
        <span className="font-semibold">3 nights</span> in Starlight World
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">No. of guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border rounded p-2 w-2/3 bg-black text-white"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">From</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select start date"
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">To</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ?? undefined}
          placeholderText="Select end date"
          className="border rounded p-2 w-full"
        />
      </div>

      <button className="bg-blue-600 text-white py-2 px-4 rounded">
        Register
      </button>
    </div>
  );
};

const Details: React.FC<DetailsProps> = ({ id }) => {
  const [data, setData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const endpoint = `${process.env.NEXT_PUBLIC_API}/listings/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Listing>(endpoint);
        setData(response.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading listing details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex gap-24">
      <div className="flex-1">
        <div className="text-2xl font-semibold pb-4">Entire Hotel Details</div>

        <div className="flex gap-8">
          <div className="flex gap-4 items-center">
            <Users /> Guests
          </div>
          <div className="flex gap-4 items-center">
            <Flag /> 1 bedroom
          </div>
          <div className="flex gap-4 items-center">
            <Flag /> 1 Private bath
          </div>
        </div>

        <div className="pt-4">
          <div className="text-sm py-4">Hosted by:</div>
          <div className="flex gap-4 items-center">
            <div className="rounded-full aspect-square bg-blue-500 h-12"></div>
            <div className="text-lg">{data?.host?.name || "Unknown Host"}</div>
          </div>
        </div>

        <div className="flex py-8 flex-col gap-4">
          <div className="text-lg font-semibold">Room Description</div>
          <div>{data?.description || "No description provided."}</div>
        </div>
      </div>

      <Book />
    </div>
  );
};

export default Details;