import React from "react";

function Input({ name, state, setState, label = false }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-lg font-semibold text-teal-light">
          {name}
        </label>
      )}
      <input
        type="text"
        name={name}
        id={name}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="bg-input-background text-start text-white border border-gray-600 rounded-lg px-5 py-4 w-full focus:outline-none focus:ring-2"
      />
    </div>
  );
}

export default Input;
