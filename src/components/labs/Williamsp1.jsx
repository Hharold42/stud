import React, { useState, useEffect } from "react";

const WilliamsFactorization = () => {
  const [number, setNumber] = useState("");
  const [factors, setFactors] = useState([]);

  const williamsFactorization = (n) => {
    if (n % 2 === 0) {
      return [2, n / 2];
    }

    let x = Math.ceil(Math.sqrt(n));
    let y = 0;
    let square = 0;

    while (true) {
      square = x * x;
      y = Math.sqrt(square - n);

      if (Number.isInteger(y)) {
        return [x - y, x + y];
      }

      x++;
    }
  };

  useEffect(() => {
    const parsedNumber = parseInt(number);
    if (!isNaN(parsedNumber) && parsedNumber > 0) {
      const result = williamsFactorization(parsedNumber);
      setFactors(result);
    } else {
      setFactors([]);
    }
  }, [number]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Факторизация числа методом Уильямса
      </h2>
      <div className="flex mb-4">
        <input
          type="number"
          placeholder="Введите число"
          className="flex-grow px-4 py-2 mr-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        {factors.length === 0 ? (
          <p className="italic">
            Введите положительное число для факторизации.
          </p>
        ) : (
          <p>
            Факторы числа {number}: {factors.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default WilliamsFactorization;
