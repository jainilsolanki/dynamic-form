"use client";

// IMPORTS
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";

const SelectionArea = ({ file }: { file: File | null }) => {
  return (
    <div className="text-center p-8 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer rounded-md border-2 border-dashed">
      {file ? `${file.name}` : "Select JSON File"}
    </div>
  );
};

export default function ImportPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  // STATE AND VARIABLE DECLARATIONS
  const [file, setFile] = useState<File | null>(null);

  // FUNCTION TO UPDATE LOCAL STORAGE WITH NEW DATA
  const updateLocalStorageData = (newData: any) => {
    localStorage.setItem("data", JSON.stringify(newData));
    window.dispatchEvent(new Event("localStorageUpdate"));
  };

  // FUNCTION TO HANDLE FILE SELECTION
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  // FUNCTION TO READ AND STORE JSON CONTENT FROM THE FILE
  const handleFileRead = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          updateLocalStorageData(jsonData);
          alert("Data successfully imported!");
          handleClose()
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    } else {
      alert("No file selected");
    }
  };

  // FUNCTION TO CLOSE DIALOG
  const handleClose = () => {
    setOpen(false)
  }



  return (
    <Dialog open={open}>
      <div className="justify-center items-center flex ">
        <div className="h-1/3 w-screen shadow-lg rounded-xl py-6 px-8 flex justify-evenly flex-col gap-4">
          <Typography variant="h6">Import your data</Typography>

          <label
            style={{
              display: "inline-block",
              width: "100%",
            }}
          >
            <input
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <SelectionArea file={file} />
          </label>

          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={handleClose}
              color="error"
            >
              Close
            </Button>
            <Button variant="outlined" onClick={handleFileRead}>
              Import
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
