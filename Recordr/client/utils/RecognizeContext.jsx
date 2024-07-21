import React, { createContext, useContext, useState } from 'react';

const RecognizeContext = createContext();

export const useRecognize = () => useContext(RecognizeContext);

export const RecognizeProvider = ({ children }) => {
  const [recognize, setRecognize] = useState(false);

  return (
    <RecognizeContext.Provider value={{ recognize, setRecognize }}>
      {children}
    </RecognizeContext.Provider>
  );
};
