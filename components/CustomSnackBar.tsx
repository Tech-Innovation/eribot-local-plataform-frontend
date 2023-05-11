import { Snackbar, Alert, AlertColor } from "@mui/material";
import { SyntheticEvent } from "react";

interface ICustomSnackBarProps {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  duration: number;
  onClose: (event?: Event | SyntheticEvent, reason?: string) => void;
}

export default function CustomSnackBar(props: ICustomSnackBarProps) {
  return (
    <Snackbar open={props.open} autoHideDuration={props.duration} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity={props.severity} sx={{ width: "100%" }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
