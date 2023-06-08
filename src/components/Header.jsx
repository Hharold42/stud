import React from "react";
import { useUltimate } from "../context/UltimateContext";

const Header = () => {
  const { subjects, setCurrentSubj } = useUltimate();

  const btnClickHandler = (e, param) => {
    e.preventDefault();

    setCurrentSubj(param);
  };

  const elems = subjects.map((item) => (
    <button onClick={(e) => btnClickHandler(e, item.subj)}>{item.name}</button>
  ));

  return (
    <div className="w-full h-[70px] bg-sky-300 flex flex-row justify-evenly">
      {elems}
    </div>
  );
};

export default Header;
