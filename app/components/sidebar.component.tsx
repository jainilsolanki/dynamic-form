"use client";

// IMPORTS
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useData from "../hooks/useData";
import { useContext, useState } from "react";
import ImportPopup from "./import-file-popup.component";
import { FormContext } from "../wrappers/form-layout.wrapper";

export default function SideBar() {
  // STATE AND VARIABLE DECLARATIONS
  const data = useData();
  const { selectedForm, setSelectedForm } = useContext(FormContext);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const icons = [
    <PersonIcon />,
    <ContactEmergencyIcon />,
    <WorkIcon />,
    <SchoolIcon />,
    <FavoriteIcon />,
  ];


  // FUNCTION TO RENDER ICONS
  const getIcons = (index: number) => {
    return icons[index % icons.length];
  };

  // HANDLE SIDEBAR ITEMS CLICK EVENT
  const handleListItemClick = (index: number) => {
    setSelectedForm(index);
  };

  return (
    <div className="shadow-lg py-4 px-6 flex flex-col justify-between h-screen">
      <div>
        <Typography variant="h6" className="mb-6" sx={{ fontWeight: "bold" }}>
          Personal
        </Typography>

        <List>
          {data.form.groups.map((title: any, index: number) => (
            <ListItem
              key={index}
              className={`hover:shadow-md ${selectedForm === index && "shadow-md"
                }`}
              onClick={() => handleListItemClick(index)}
              sx={{
                color: selectedForm === index ? "primary.main" : "black",
                "& .MuiListItemIcon-root": {
                  color: selectedForm === index ? "primary.main" : "",
                },
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "& .MuiListItemText-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon>{getIcons(index)}</ListItemIcon>
              <ListItemText>{title["title"]}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
      {openImportDialog && (
        <ImportPopup open={openImportDialog} setOpen={setOpenImportDialog} />
      )}
      <Button className="w-full" onClick={() => setOpenImportDialog(true)}>
        Edit Data
      </Button>
    </div>
  );
}
