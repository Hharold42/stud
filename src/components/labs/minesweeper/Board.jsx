import { useEffect, useState } from "react";
import { useUltimate } from "../../../context/UltimateContext";
import Tile from "./Tile";

const Board = () => {
  const [rend, setRend] = useState(<>tilesPH</>);
  const { tiles, endGame } = useUltimate();

  useEffect(() => {
    if (tiles !== null) {
      setRend(
        tiles.map((item) => (
          <div className="flex flex-row">
            {item.map((subItem) => (
              <Tile
                x={subItem.x}
                y={subItem.y}
                type={subItem.type}
                closed={subItem.closed}
                number={subItem.number}
              />
            ))}
          </div>
        ))
      );
    }
  }, [tiles]);

  return <div className={endGame ? "pointer-events-none" : ""}>{rend}</div>;
};

export default Board;
