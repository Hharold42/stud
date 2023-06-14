import React from "react";
import { useUltimate } from "../../../context/UltimateContext";

const Tile = ({ type, x, y, closed, number }) => {
  const { openTile, setEndGame } = useUltimate();
  const styles = closed
    ? "bg-slate-400"
    : type === "mine"
    ? "bg-red-700"
    : "bg-green-500";

  const handleClick = (e) => {
    e.preventDefault();

    openTile(x, y);

    if (type === "mine") {
      setTimeout(() => setEndGame(true), 500);
      alert("Гейм овер");
    }
  };

  return (
    <div
      className={`h-10 w-10 border-2 border-slate-300 text-center ${styles}`}
      onClick={handleClick}
    >
      {closed ? null : number}
    </div>
  );
};

export default Tile;
