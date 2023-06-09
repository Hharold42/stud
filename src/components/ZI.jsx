import React, { useState } from "react";
import Navbar from "./Navbar";
import PlaceHolder from "./PlaceHolder";
import Cesar from "./labs/Cesar";
import RSA from "./labs/RSA";
import Strassen from "./labs/Strassen";
import ECDH from "./labs/ECDH";
import WilliamsP1Algorithm from "./labs/Williamsp1";

const ZI = () => {
  const [currentLab, setCurrentLab] = useState(<PlaceHolder />);
  const navData = [
    { name: "Шифр цезаря", elem: <Cesar /> },
    { name: "RSA", elem: <RSA /> },
    { name: "Штрассен и Миллер", elem: <Strassen /> },
    { name: "ECDH", elem: <ECDH /> },
    { name: "Утльямс p + 1", elem: <WilliamsP1Algorithm /> },
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
