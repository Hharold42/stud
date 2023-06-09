import React, { useEffect, useState } from "react";
import { cesar, deCesar, getNewAlph } from "../../utils/cesarAlgh";

const Cesar = () => {
  const b_alph = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
    .split("")
    .map((item) => (
      <div className="border p-2">{item}</div>
    ));
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [rot, setRot] = useState(0);
  const [output, setOutput] = useState("");
  const [alph, setAlph] = useState(b_alph);

  useEffect(() => {
    if (getNewAlph(keyword, rot)) {
      setAlph(
        getNewAlph(keyword, rot).map((item) => (
          <div className="border p-2">{item}</div>
        ))
      );
    }
  }, [rot, keyword]);

  const keywordHandler = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const messageHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const rotHandler = (e) => {
    e.preventDefault();
    setRot(e.target.value);
  };

  const encrypt = () => {
    const res = cesar(keyword, message, rot);
    if (res !== -1) setOutput(res);
    else alert("Неверный ключ");
  };

  const decrypt = () => {
    const res = deCesar(keyword, message, rot);
    if (res !== -1) setOutput(res);
    else alert("Неверный ключ");
  };

  return (
    <div className="w-full flex flex-col items-center m-5">
      <div className="flex flex-col mt-2 bg-gray-300 p-2">
        <label>Ключ</label>
        <input
          type="text"
          placeholder="Ключ"
          value={keyword}
          onChange={keywordHandler}
          className="w-full p-2 border border-gray-400 rounded-md"
        ></input>
      </div>
      <div className="flex flex-col bg-gray-300 p-2">
        <label>Ротация</label>
        <input
          type="text"
          placeholder="Ротация"
          value={rot}
          onChange={rotHandler}
          className="w-full p-2 border border-gray-400 rounded-md"
        ></input>
      </div>
      <div className="flex flex-row mt-2 bg-gray-300">
        <div className="flex flex-col m-2 p-2">
          <label>Сообщение</label>
          <textarea
            placeholder="Сообщение"
            value={message}
            className="min-h-[270px] min-w-[210px] w-full p-2 border border-gray-400 rounded-md"
            onChange={messageHandler}
          ></textarea>
        </div>
        <div className="flex flex-col justify-between">
          <button className="m-3 border border-black p-2" onClick={encrypt}>
            Шифровать
          </button>
          <button className="m-3 border border-black p-2" onClick={decrypt}>
            Дешифровать
          </button>
        </div>
        <div className="flex flex-col m-2 p-2">
          <label>Вывод</label>
          <textarea
            placeholder="Вывод"
            value={output}
            disabled
            className="min-h-[270px] min-w-[210px] w-full p-2 border border-gray-400 rounded-md"
          ></textarea>
        </div>
      </div>
      <section>
        <div className="flex flex-row">{b_alph}</div>
        <div className="flex flex-row">{alph}</div>
      </section>
    </div>
  );
};

export default Cesar;
