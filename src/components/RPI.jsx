import { useState } from "react";
import PlaceHolder from "./PlaceHolder";
import Minesweeper from "./labs/minesweeper/Minesweeper";
import Navbar from "./Navbar";

const RPI = () => {
  const [current, setCurrent] = useState(<PlaceHolder />);
  const navData = [{ name: "Сапер", elem: <Minesweeper /> }];

  return (
    <div className="flex flex-row h-[93vh] w-[100%]">
      <Navbar
        name={"Разработка пользовательсокго интерфейса"}
        labs={navData}
        controller={setCurrent}
      />
      {current}
    </div>
  );
};

export default RPI;
