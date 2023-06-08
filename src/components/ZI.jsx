import React, { useState } from "react";
import Navbar from "./Navbar";
import PlaceHolder from "./PlaceHolder";
import Cesar from "./labs/Cesar";
import RSA from "./labs/RSA";
import Strassen from "./labs/Strassen";

const ZI = () => {
  const [currentLab, setCurrentLab] = useState(<PlaceHolder />);
  const navData = [
    { name: "Шифр цезаря", elem: <Cesar /> },
    { name: "RSA", elem: <RSA /> },
    { name: "Алгоритм Соловея — Штрассена", elem: <Strassen /> },
  ];

  return (
    <div className="flex flex-row h-[93vh] w-[100%]">
      <Navbar
        name={"Защита информации"}
        labs={navData}
        controller={setCurrentLab}
      />
      {currentLab}
    </div>
  );
};

export default ZI;
