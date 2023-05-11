import React from "react";
import Button from "@mui/material/Button";

interface ICustomButtonProps {
  text: string;
  event: () => void;
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  disabled?: boolean;
}

export default function CustomButton(props: ICustomButtonProps) {
  return (
    <Button
      size="small"
      type="submit"
      fullWidth
      variant="contained"
      onClick={props.event}
      color={props.color ? props.color : "primary"}
      disabled={props.disabled}
      sx={{ maxHeight: "40px", minHeight: "40px" }}
    >
      {props.text}
    </Button>
  );
}
