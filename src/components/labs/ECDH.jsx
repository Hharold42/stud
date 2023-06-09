import React, { useState } from "react";

const ECDHExample = () => {
  const [curveParams, setCurveParams] = useState({
    a: "",
    b: "",
    mod: "",
    basePointX: "",
    basePointY: "",
  });

  const [alicePrivateKey, setAlicePrivateKey] = useState("");
  const [bobPrivateKey, setBobPrivateKey] = useState("");
  const [sharedSecret, setSharedSecret] = useState("");

  const calculatePublicKey = (privateKey) => ({
    x:
      Math.floor(privateKey ** 3 + curveParams.a * privateKey + curveParams.b) %
      curveParams.mod,
    y: Math.floor(
      Math.sqrt(
        (privateKey ** 3 + curveParams.a * privateKey + curveParams.b) %
          curveParams.mod
      ) % curveParams.mod
    ),
  });

  const calculateSharedSecret = () => {
    const alicePublic = calculatePublicKey(parseInt(alicePrivateKey, 10));
    const bobPublic = calculatePublicKey(parseInt(bobPrivateKey, 10));
    const sharedSecretX = (alicePublic.x * bobPublic.x) % curveParams.mod;
    const sharedSecretY = (alicePublic.y * bobPublic.y) % curveParams.mod;
    setSharedSecret(`S(x = ${sharedSecretX}; y = ${sharedSecretY})`);
  };

  const handleCurveParamChange = (param, value) => {
    setCurveParams((prevState) => ({
      ...prevState,
      [param]: value,
    }));
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-6">Обмен ключами ECDH</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Параметры кривой</h3>
        {Object.entries(curveParams).map(([param, value]) => (
          <input
            key={param}
            type="text"
            placeholder={param}
            value={value}
            onChange={(e) => handleCurveParamChange(param, e.target.value)}
            className="border rounded p-1 mb-2"
          />
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Алиса</h3>
        <input
          type="text"
          placeholder="Закрытый ключ Алисы"
          value={alicePrivateKey}
          onChange={handleInputChange(setAlicePrivateKey)}
          className="border rounded p-1 mb-2"
        />
        <div>
          <strong>Открытый ключ:</strong> (
          {calculatePublicKey(parseInt(alicePrivateKey, 10)).x},{" "}
          {calculatePublicKey(parseInt(alicePrivateKey, 10)).y})
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Боб</h3>
        <input
          type="text"
          placeholder="Закрытый ключ Боба"
          value={bobPrivateKey}
          onChange={handleInputChange(setBobPrivateKey)}
          className="border rounded p-1 mb-2"
        />
        <div>
          <strong>Открытый ключ:</strong> (
          {calculatePublicKey(parseInt(bobPrivateKey, 10)).x},{" "}
          {calculatePublicKey(parseInt(bobPrivateKey, 10)).y})
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={calculateSharedSecret}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Рассчитать общий секрет
        </button>
      </div>
      {sharedSecret && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Общий секрет</h3>
          <div>
            <strong>Общий секрет:</strong> {sharedSecret}
          </div>
        </div>
      )}
    </div>
  );
};

export default ECDHExample;
