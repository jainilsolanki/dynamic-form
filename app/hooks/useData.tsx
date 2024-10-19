import { useState, useEffect } from "react";
import formData from "../data/form.json"; // FALLBACK DATA IF LOCALSTORAGE IS EMPTY

const useData = () => {
  const [data, setData] = useState<any>(() => {
    if (typeof window !== "undefined") {
      // ONLY ACCESS LOCALSTORAGE IN THE BROWSER
      const storedData = localStorage.getItem("data");
      return storedData ? JSON.parse(storedData) : formData;
    } else {
      // ON THE SERVER SIDE, JUST USE THE FALLBACK FORMDATA
      return formData;
    }
  });

  useEffect(() => {
    // ENSURING THIS EFFECT RUNS ONLY ON THE CLIENT
    if (typeof window === "undefined") {
      return;
    }

    const handleStorageChange = () => {
      // GET THE UPDATED DATA FROM LOCALSTORAGE AND UPDATE THE STATE
      const updatedData = localStorage.getItem("data");
      if (updatedData) {
        setData(JSON.parse(updatedData));
      }
    };

    // UPDATE THE STATE WHEN THE LOCALSTORAGE DATA CHANGES
    window.addEventListener("storage", handleStorageChange);

    // ALSO LISTEN TO CHANGES FROM WITHIN THE SAME DOCUMENT (IF LOCALSTORAGE IS UPDATED IN THE SAME TAB)
    const localUpdateListener = () => {
      handleStorageChange();
    };
    window.addEventListener("localStorageUpdate", localUpdateListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdate", localUpdateListener);
    };
  }, []);

  return data;
};

export default useData;
