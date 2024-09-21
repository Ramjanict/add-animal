import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextContainer = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {});
  return (
    <Context.Provider
      value={{
        data,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextContainer;
