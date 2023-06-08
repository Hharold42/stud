import { createContext, useContext, useState } from "react";
import PlaceHolder from "../components/PlaceHolder";
import ZI from "../components/ZI";
import II from "../components/II";

const UltimateContext = createContext();

export const useUltimate = () => useContext(UltimateContext);

const UltimateProvider = ({ children }) => {
  const subjects = [
    { name: "Защита информации", subj: <ZI /> },
    { name: "Искусственный интеллект", subj: <II /> },
  ];
  const [currentSubj, setCurrentSubj] = useState(<PlaceHolder />);

  const values = { subjects, currentSubj, setCurrentSubj };

  return (
    <UltimateContext.Provider value={values}>
      {children}
    </UltimateContext.Provider>
  );
};

export default UltimateProvider;
