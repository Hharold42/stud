import { useEffect, useState } from "react";
import solovoyStrassen from "../../utils/strassenAlgh";
import millerA from "../../utils/millerAlgh";

const Strassen = () => {
  const [n, setN] = useState(0);
  const [k, setK] = useState(0);
  const [strassen, setStrassen] = useState([]);
  const [miller, setMiller] = useState([]);

  const inputHandler = (e) => {
    if (e.target.id === "n") {
      setN(e.target.value);
    } else if (e.target.id === "k") {
      setK(e.target.value);
    }
  };

  const buttonHandler = (e) => {
    setStrassen(() => solovoyStrassen(n, k).join("\n"));
    setMiller(() => millerA(n, k));
  };

  return (
    <div className="w-[100%] flex flex-col items-center m-5">
      <div className="bg-slate-400 p-3">
        <div className="flex flex-col mt-2">
          <label>Число</label>
          <input value={n} id="n" onChange={inputHandler} />
        </div>
        <div className="flex flex-col mt-2">
          <label>Кол-во итераций</label>
          <input value={k} id="k" onChange={inputHandler} />
        </div>
        <button
          onClick={buttonHandler}
          className="border-black border-2 p-1 mt-2"
        >
          Вычислить
        </button>
        <div className="flex flex-col mt-2">
          <label>Соловея Штрассена</label>
          <textarea disabled className="bg-white" value={strassen} />
        </div>
        <div className="flex flex-col mt-2">
          <label>Миллера</label>
          <textarea disabled className="bg-white" value={miller.join("\n")} />
        </div>
      </div>
    </div>
  );
};

export default Strassen;
