
"use client";
const GenderTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-300">
        <p className="font-semibold text-black">{label}</p>
        <p className="text-pink-500">Women : {payload[0].value}</p>
        <p className="text-blue-500">Men : {payload[1].value}</p>
      </div>
    );
  }
  return null;
};
export default GenderTooltip;