import React, { useState } from "react";
import { useUltimate } from "../../../context/UltimateContext";

const Tile = ({ type, x, y, closed, number }) => {
  const [marked, setMarked] = useState(false);

  const handleRC = (e) => {
    e.preventDefault();
    if (!closed) return;

    setMarked((prev) => !prev);
  };

  const { openTile, setEndGame, openAll } = useUltimate();
  const getColorClasses = () => {
    if (closed) {
      return "bg-gray-400";
    } else if (type === "mine") {
      return "bg-red-500";
    } else {
      return "bg-green-500";
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    openTile(x, y);

    if (type === "mine") {
      setTimeout(() => setEndGame(true), 500);
      alert("Гейм овер");
      openAll();
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-12 h-12 ${getColorClasses()} text-white text-lg font-bold border  rounded shadow ${
        marked ? "border-red-800" : "border-gray-300"
      }`}
      onClick={handleClick}
      onContextMenu={handleRC}
    >
      {closed ? null : number}
    </div>
  );
};

export default Tile;
