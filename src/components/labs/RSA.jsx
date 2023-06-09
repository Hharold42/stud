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
    <div className="w-full flex flex-col items-center mt-5">
      <div className="bg-red-500 p-5">
        <div className="flex flex-col mt-2">
          <label className="text-white">P</label>
          <input type="text" value={p} id="p" onChange={inputHandler} className="bg-red-100 text-red-900 px-2 py-1 mt-1" />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-white">Q</label>
          <input type="text" value={q} id="q" onChange={inputHandler} className="bg-red-100 text-red-900 px-2 py-1 mt-1" />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-white">Сообщение</label>
          <input value={message} id="msg" onChange={inputHandler} className="bg-red-100 text-red-900 px-2 py-1 mt-1" />
          <button
            className="border-black border-2 p-1 mt-2 bg-red-200 text-red-900"
            id="e"
            onClick={buttonHandler}
          >
            Зашифровать
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-white">Зашифрованное сообщение</label>
          <textarea
            value={crypt}
            id="crypt"
            onChange={inputHandler}
            disabled
            className="bg-white text-red-900 px-2 py-1 mt-1"
          />
          <button
            className="border-black border-2 p-1 mt-2 bg-red-200 text-red-900"
            id="d"
            onClick={buttonHandler}
          >
            Расшифровать
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-white">Расшифрованное сообщение</label>
          <textarea
            value={decrypt}
            id="decrypt"
            onChange={inputHandler}
            disabled
            className="bg-white text-red-900 px-2 py-1 mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default RSA;
