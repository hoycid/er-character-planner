import React, { useState, createContext, useContext } from "react";

const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  const [level, setLevel] = useState(0);
  const [totalRunes, setTotalRunes] = useState(0);

  return (
    <LevelContext.Provider
      value={{ level, setLevel, totalRunes, setTotalRunes }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => useContext(LevelContext);
