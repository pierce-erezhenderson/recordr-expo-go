import React, { createContext, useContext, useState } from 'react';

const SuccessContext = createContext();

export const useSuccess = () => useContext(SuccessContext);

export const SuccessProvider = ({ children }) => {
    const [success, setSuccess] = useState(false);
    
    return (
        <SuccessContext.Provider value={{ success, setSuccess }}>
            {children}
        </SuccessContext.Provider>
    );
};
