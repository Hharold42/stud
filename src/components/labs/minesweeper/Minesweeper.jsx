import React, { useState } from "react";
import Board from "./Board";
import { Form } from "react-bootstrap";
import { useUltimate } from "../../../context/UltimateContext";

const Minesweeper = () => {
  const { generateBoard, generateMines, setEndGame } = useUltimate();
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
    <div>
      <span>Введите размерность сетки</span>
      <input type="number" value={size} onChange={inputHandler} />
      <span>Сложность</span>
      <Form.Select value={level} onChange={formChange}>
        <option value={1}>Легко</option>
        <option value={2}>Средне</option>
        <option value={3}>Сложно</option>
      </Form.Select>
      <button onClick={handleClick}>Создать сетку</button>
      <Board />
    </div>
  );
};

export default Minesweeper;
