import React from "react";

export const MoneyInput = () => {
  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm sm:leading-5">$</span>
        </div>
        <input
          id="price"
          className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
          placeholder="0.00"
          aria-describedby="price-currency"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span
            className="text-gray-500 sm:text-sm sm:leading-5"
            id="price-currency"
          >
            EUR
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoneyInput;
