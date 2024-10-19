"use client";
//IMPORTS
import { useContext, useState } from "react";
import useData from "../hooks/useData";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { FormContext } from "../wrappers/form-layout.wrapper";

export default function FormComponent() {
  // STATE AND VARIABLE DECLARATIONS
  const { selectedForm } = useContext(FormContext);
  const data = useData();
  const dataToRender = data.form.groups[selectedForm];

  const [formValues, setFormValues] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("formData") || "{}")
      : {}
  );

  // FUNCTION TO HANDLE ALL INPUT CHANGES
  const handleInputChange = (event: any) => {
    console.log(event.target.value);

    const { name, value, type, checked } = event.target;
    console.log(name, value, type, checked);
    setFormValues((prevValues: any) => {
      console.log(prevValues);
      let newValue = prevValues[name];
      if (type === "checkbox") {
        if (newValue && Array.isArray(newValue)) {
          if (checked) {
            newValue.push(value);
          } else {
            newValue = newValue.filter((item: any) => item !== value);
          }
        } else {
          newValue = checked ? [value] : [];
        }
      } else {
        newValue = value;
      }
      console.log("HI--", newValue, name, checked);

      return {
        ...prevValues,
        [name]: newValue,
      };
    });
  };


  // FUNCTION TO HANDLE FORM SUBMISSION AND SAVE USER DATA TO LOCAL STORAGE
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Save form values to localStorage
    localStorage.setItem("formData", JSON.stringify(formValues));
    alert("Form data saved!");
  };


  // SWITCH TO CONDITIONALLY RENDER COMPONENTS BASED ON MATCHING TYPE
  const renderField = (field: any) => {
    const defaultValue = formValues[field.name] || "";
    switch (field.type) {
      case "text":
      case "number":
        return (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            fullWidth
            margin="normal"
            value={defaultValue}
            onChange={handleInputChange}
          />
        );

      case "textarea":
        return (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={defaultValue}
            onChange={handleInputChange}
          />
        );

      case "dropdown":
        return (
          <FormControl key={field.name} fullWidth margin="normal">
            <InputLabel id="select-label">{field.label}</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              name={field.name}
              required={field.required}
              value={defaultValue}
              onChange={handleInputChange}
              label={field.label}
            >
              {field.options.map((option: string, index: number) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "radio":
        return (
          <FormControl component="fieldset" key={field.name} margin="normal">
            <Typography>{field.label}</Typography>
            <RadioGroup
              name={field.name}
              value={defaultValue}
              onChange={handleInputChange}
            >
              {field.options.map((option: any, index: number) => (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={<Radio required={field.required} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "checkbox":
        return (
          <FormControl component="fieldset" key={field.name} margin="normal">
            <Typography>{field.label}</Typography>
            {field.options.map((option: any, index: number) => {
              console.log("field", field);
              console.log("formvalues", formValues);

              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={field.name}
                      value={field.options[index].value}
                      checked={
                        Array.isArray(formValues[field.name]) &&
                        formValues[field.name].includes(
                          field.options[index].value
                        )
                      }
                      onChange={handleInputChange}
                    />
                  }
                  label={option.label}
                />
              );
            })}
          </FormControl>
        );

      case "slider":
        return (
          <FormControl key={field.name} fullWidth margin="normal">
            <Typography gutterBottom>{field.label}</Typography>
            <Slider
              name={field.name}
              value={formValues[field.name] || field.min}
              min={field.min}
              max={field.max}
              step={field.step}
              marks
              valueLabelDisplay="auto"
              onChange={(e, value) =>
                handleInputChange({ target: { name: field.name, value } })
              }
            />
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-4 px-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2 ">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {data.form.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
          {data.form.description}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="h6">{dataToRender.title}</Typography>
          {dataToRender.fields.map((field: any, index: any) => (
            <div key={index}>{renderField(field)}</div>
          ))}
        </div>
        <div className="mt-8">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
