import { createContext, useContext, useState, useRef, useEffect } from "react";
import PlaceHolder from "../components/PlaceHolder";
import ZI from "../components/ZI";
import II from "../components/II";
import RPI from "../components/RPI";

const UltimateContext = createContext();

export const useUltimate = () => useContext(UltimateContext);

const UltimateProvider = ({ children }) => {
  const [tiles, setTiles] = useState(null);
  const [endGame, setEndGame] = useState(false);
  const [minesCount, setMineCount] = useState(0);

  const tilesRef = useRef(null);
  tilesRef.current = tiles;

  const generateMines = (level, size) => {
    const minePercent = [0.15, 0.25, 0.35];
    const numMines = Math.floor(minePercent[level] * size * size);
    setMineCount(numMines);

    const mines = new Set();

    while (mines.size < numMines) {
      const row = Math.floor(Math.random() * size);
      const column = Math.floor(Math.random() * size);

      const coordinate = `${row},${column}`;
      mines.add(coordinate);
    }

    const newtiles = [];

    for (let row = 0; row < size; row++) {
      newtiles.push([]);
      for (let column = 0; column < size; column++) {
        const coordinate = `${row},${column}`;
        const tile = {
          x: row,
          y: column,
          type: mines.has(coordinate) ? "mine" : "clean",
          closed: true,
          number: 0,
        };

        newtiles[row].push(tile);
      }
    }
    const uptiles = updateTilesWithMinesCount(newtiles);
    setTiles(uptiles);
  };

  function updateTilesWithMinesCount(matrix) {
    const numRows = matrix.length;
    const numColumns = matrix[0].length;
    const updatedTiles = [];

    for (let row = 0; row < numRows; row++) {
      const updatedRow = [];

      for (let column = 0; column < numColumns; column++) {
        const tile = matrix[row][column];

        if (tile.type === "clean") {
          const neighbors = [
            { dx: -1, dy: -1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: 1 },
          ];

          let mineCount = 0;

          neighbors.forEach((neighbor) => {
            const neighborRow = row + neighbor.dx;
            const neighborColumn = column + neighbor.dy;

            if (
              neighborRow >= 0 &&
              neighborRow < numRows &&
              neighborColumn >= 0 &&
              neighborColumn < numColumns &&
              matrix[neighborRow][neighborColumn].type === "mine"
            ) {
              mineCount++;
            }
          });
          console.log(mineCount);
          updatedRow.push({
            ...tile,
            number: mineCount,
          });
        } else {
          updatedRow.push(tile);
        }
      }
      updatedTiles.push(updatedRow);
    }

    return updatedTiles;
  }

  const openTile = (row, column) => {
    console.log(row, column);
    setTiles((prevTiles) => {
      const updatedTiles = [...prevTiles];
      const tile = updatedTiles[row][column];

      if (!tile.closed) {
        // Tile is already open, return the previous state
        return prevTiles;
      }

      tile.closed = false;

      if (tile.number === 0) {
        const neighbors = [
          { dx: -1, dy: -1 },
          { dx: -1, dy: 0 },
          { dx: -1, dy: 1 },
          { dx: 0, dy: -1 },
          { dx: 0, dy: 1 },
          { dx: 1, dy: -1 },
          { dx: 1, dy: 0 },
          { dx: 1, dy: 1 },
        ];

        neighbors.forEach((neighbor) => {
          const neighborRow = row + neighbor.dx;
          const neighborColumn = column + neighbor.dy;

          if (
            neighborRow >= 0 &&
            neighborRow < updatedTiles.length &&
            neighborColumn >= 0 &&
            neighborColumn < updatedTiles[0].length
          ) {
            openTile(neighborRow, neighborColumn);
          }
        });
      }

      return updatedTiles;
    });
  };

  const generateBoard = (size) => {
    if (size < 2 || size > 10) {
      alert("Введите размер сетки меньше 2 и больше 10");
      return;
    }

    const matrix = [];

    for (let i = 0; i < size; i++) {
      matrix.push([]);
      for (let j = 0; j < size; j++) {
        matrix[i].push({
          x: i,
          y: j,
          type: "initial",
          closed: true,
          number: 0,
        });
      }
    }
    setTiles(matrix);
  };

  const openAll = () => {
    setTiles((prev) =>
      prev.map((row) => row.map((item) => ({ ...item, closed: false })))
    );
  };

  useEffect(() => {
    console.log(tiles);
  }, [tiles]);

  const subjects = [
    { name: "Защита информации", subj: <ZI /> },
    { name: "Искусственный интеллект", subj: <II /> },
    { name: "Разработка пользовательского интерфейса", subj: <RPI /> },
  ];
  const [currentSubj, setCurrentSubj] = useState(<PlaceHolder />);

  const values = {
    subjects,
    currentSubj,
    setCurrentSubj,
    generateBoard,
    tiles,
    generateMines,
    openTile,
    endGame,
    setEndGame,
    openAll,
    minesCount,
  };

  return (
    <UltimateContext.Provider value={values}>
      {children}
    </UltimateContext.Provider>
  );
};

export default UltimateProvider;
