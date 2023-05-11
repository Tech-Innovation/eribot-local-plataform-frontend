import React from "react";
import { TextField } from "@mui/material";

interface IStatusTextFieldProps {
  text: string;
  status: string;
}

export default function StatusTextField(props: IStatusTextFieldProps) {
  return (
    <TextField
      size="small"
      fullWidth
      label={props.text}
      disabled
      sx={{ backgroundColor: renderSwitch(props.status) }}
      InputLabelProps={{
        style: { color: "#FFFFFF" },
      }}
    />
  );
}

function renderSwitch(param: string) {
  switch (param) {
    case "Connecting":
      return "#FFBF00";
    case "Open":
      return "#007000";
    case "Closing":
      return "#FFBF00";
    case "Closed":
      return "#D2222D";
    case "Uninstantiated":
      return "#D2222D";
    default:
      return "#D2222D";
  }
}
