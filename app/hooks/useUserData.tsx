"use client"

// IMPORTS
import { useState, useEffect } from "react";
import formData from "../data/form.json";

const useUserData = () => {
  // STATE AND VARIABLE DECLARATIONS
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    // GET THE UPDATED DATA FROM LOCALSTORAGE AND UPDATE THE STATE
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(formData);
    }
  }, []);

  return data;
};

export default useUserData;
