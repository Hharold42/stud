/* global BigInt */

import React, { useState } from "react";

import rsalgh from "../../utils/RSAlgh";

const RSA = () => {
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0);
  const [message, setMessage] = useState("");
  const [crypt, setCrypt] = useState("");
  const [decrypt, setDecrypt] = useState("");

  const inputHandler = (e) => {
    e.preventDefault();

    if (e.target.id === "p") {
      setP(e.target.value);
    } else if (e.target.id === "q") {
      setQ(e.target.value);
    } else if (e.target.id === "msg") {
      setMessage(e.target.value);
    }
  };

  const buttonHandler = (e) => {
    if (e.target.id === "e") {
      setCrypt(rsalgh(BigInt(p), BigInt(q), message, "e"));
    } else if (e.target.id === "d") {
      setDecrypt(rsalgh(BigInt(p), BigInt(q), message, "d"));
    }
  };

  return (
    <div className="w-[100%] flex flex-col items-center m-5">
      <div className="bg-slate-400 p-5">
        <div className="flex flex-col mt-2">
          <label>P</label>
          <input type="text" value={p} id="p" onChange={inputHandler} />
        </div>
        <div className="flex flex-col mt-2">
          <label>Q</label>
          <input type="text" value={q} id="q" onChange={inputHandler} />
        </div>
        <div className="flex flex-col mt-2">
          <label>Сообщение</label>
          <input value={message} id="msg" onChange={inputHandler} />
          <button
            className="border-black border-2 p-1 mt-2"
            id="e"
            onClick={buttonHandler}
          >
            Зашифровать
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <label>Зашифрованное сообщение</label>
          <textarea
            value={crypt}
            id="crypt"
            onChange={inputHandler}
            disabled
            className="bg-white"
          />
          <button
            className="border-black border-2 p-1 mt-2"
            id="d"
            onClick={buttonHandler}
          >
            Расшифровать
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <label>Расшифрованное сообщение сообщение</label>
          <textarea
            value={decrypt}
            id="decrypt"
            onChange={inputHandler}
            disabled
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default RSA;
