import React, { useState, createContext, useEffect } from "react";


export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    localStorage.setItem("food", JSON.stringify(food));
  }, [food]);

  return (
    <FoodContext.Provider value={[food, setFood]}>
      {children}
    </FoodContext.Provider>
  );
}