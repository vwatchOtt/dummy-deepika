import { X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function FilterModal({ onClose }) {
  const [age, setAge] = useState("");
  const [country, setCountry] = useState(null);

  const ages = Array.from({ length: 83 }, (_, i) => `${i + 18}`);
  const countries = countryList().getData();

  return (
    <div className="absolute top-full mt-2 right-0 bg-white border shadow-xl rounded-lg p-4 w-[480px] max-w-[95vw] z-50">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] md:text-[18px] font-semibold">Filter</h2>
        <button
          onClick={onClose}
          className="w-7 h-7 md:w-8 md:h-8 bg-red-500 text-white flex items-center justify-center rounded-full"
        >
          <X size={16} className="md:size-5" />
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* AGE */}
        <div>
          <label className="block mb-1 text-[14px] md:text-sm text-gray-600">Age</label>
         <select
  value={age}
  onChange={(e) => setAge(e.target.value)}
  className="w-full h-[34px] border rounded-md text-[10px] leading-[14px] px-1"
>
  <option value="">Select Age</option>
  {ages.map((a) => (
    <option key={a} value={a}>{a}</option>
  ))}
</select>

        </div>

        {/* COUNTRY */}
        <div>
          <label className="block mb-1 text-[12px] md:text-sm text-gray-600">
            Country <span className="text-red-500">*</span>
          </label>
          <Select
  options={countries}
  value={country}
  onChange={setCountry}
  className="text-[12px] md:text-base"
  styles={{
    control: (base) => ({
      ...base,
      minHeight: "34px",
      height: "34px",
      borderRadius: "6px",
      padding: "0 4px",
    }),
    valueContainer: (base) => ({
      ...base,
      height: "34px",
      padding: "0 6px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "34px",
    }),
  }}
/>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4 mt-5">

        <button className="bg-blue-600 text-white px-10 py-1 rounded-md text-sm md:text-base text-center">
          Apply
        </button>

        <button
          className="bg-red-500 text-white px-5 py-1 rounded-md text-sm md:text-base text-center"
          onClick={() => {
            setAge("");
            setCountry(null);
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
