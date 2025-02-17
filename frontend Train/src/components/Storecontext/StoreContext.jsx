import { createContext, useEffect, useState } from "react";
import { Train_category } from "../../assets/front/assets.js";
import axiosInstance from "../axiosIntance/axiosInstance.jsx";



export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [passengers, setPassengers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");




  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  const contextvalue = {
    Train_category,
    setPassengers,
    passengers,
    token,

    setToken


  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;

