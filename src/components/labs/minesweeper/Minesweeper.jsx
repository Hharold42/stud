import React, { useState } from "react";
import Board from "./Board";
import { Form } from "react-bootstrap";
import { useUltimate } from "../../../context/UltimateContext";

const Minesweeper = () => {
  const { generateBoard, generateMines, setEndGame, minesCount } = useUltimate();
  const [size, setSize] = useState(8);
  const [level, setLevel] = useState(1);

  const inputHandler = (e) => {
    e.preventDefault();

    setSize(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    generateBoard(size);
    generateMines(level, size);
    setEndGame(false);
  };

  const formChange = (e) => {
    e.preventDefault();

    setLevel(e.target.value);
  };

  return (
    <div className="flex flex-col w-full items-center p-5 min-w-[300px]">
      <span className="">Введите размерность сетки</span>
      <input type="number" className="border-2 border-slate-300 rounded-md p-1 mb-2" value={size} onChange={inputHandler} />
      <span>Сложность</span>
      <Form.Select value={level} onChange={formChange} className="border-2 border-slate-300 rounded-md p-1 mb-2">
        <option value={1}>Легко</option>
        <option value={2}>Средне</option>
        <option value={3}>Сложно</option>
      </Form.Select>
      <button onClick={handleClick} className="border-2 border-black bg-slate-300 p-1 mb-2 rounded-md">Создать сетку</button>
      <Board />
      <div>Кол-во мин{minesCount}</div>
    </div>
  );
};

export default Minesweeper;
