import React from "react";

const Navbar = ({ name, labs, controller }) => {
  const buttonClick = (param) => {
    controller(param);
  };

  const buttons = labs.map((item) => (
    <button
      className="mt-1 text-black hover:text-red-400 hover:transition-colors transition-colors"
      onClick={() => buttonClick(item.elem)}
    >
      {item.name}
    </button>
  ));

  return (
    <div className="w-[140px] bg-slate-500 bottom-0 h-[100%] p-2">
      <h3 className="text-white border-b-2 border-black p-1">{name}</h3>
      {buttons}
    </div>
  );
};

export default Navbar;
