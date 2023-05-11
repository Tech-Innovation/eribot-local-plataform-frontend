import {
  Collapse,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useWebSocket, { ReadyState } from "react-use-websocket";
import StatusTextField from "../StatusTextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  setVectorDirection,
  setRackInitialPlace,
  setRackLevels,
  setRackBays,
} from "@/features/reading/readingProcessSlice";

interface IInputPanel {
  [key: string]: any;
}

export const InputPanel = (props: IInputPanel) => {
  const dispatch = useAppDispatch();

  const readingProcessIsRunning = useAppSelector((state) => state.readingProcess.isRunning);
  const vectorDirection = useAppSelector((state) => state.readingProcess.vectorDirection);
  const rackInitialPlace = useAppSelector((state) => state.readingProcess.rackInitialPlace);
  const rackBays = useAppSelector((state) => state.readingProcess.rackBays);
  const rackLevels = useAppSelector((state) => state.readingProcess.rackLevels);
  const readings = useAppSelector((state) => state.readingProcess.readings);
  const currentPosition = useAppSelector((state) => state.readingProcess.currentPosition);

  const [openInputs, setOpenInputs] = useState(true);
  const handleInputs = () => {
    setOpenInputs(!openInputs);
  };

  useEffect(() => {
    if (readingProcessIsRunning) {
      setOpenInputs(false);
    } else {
      setOpenInputs(true);
    }
  }, [readingProcessIsRunning]);

  const readingModeToggle = (
    <ToggleButtonGroup
      color="primary"
      value={vectorDirection}
      exclusive
      onChange={(_, newVectorDirection) => {
        dispatch(setVectorDirection(newVectorDirection));
      }}
      aria-label="Platform"
      fullWidth
      disabled={readingProcessIsRunning}
      sx={{ height: "40px" }}
    >
      <ToggleButton value="horizontal">HORIZONTAL</ToggleButton>
      <ToggleButton value="vertical">VERTICAL</ToggleButton>
    </ToggleButtonGroup>
  );

  const rackInitialPlaceField = (
    <TextField
      size="small"
      fullWidth
      disabled={readingProcessIsRunning}
      id="rackInitialPlaceField"
      label="Ubiación Inicial"
      name="rackInitialPlaceField"
      type="text"
      value={rackInitialPlace}
      onChange={(e) => {
        e.target.value = e.target.value.toUpperCase();
        dispatch(setRackInitialPlace(e.target.value));
      }}
    />
  );

  const rackBaysField = (
    <TextField
      size="small"
      fullWidth
      disabled={readingProcessIsRunning}
      id="rackBaysField"
      label="Columnas"
      name="rackBaysField"
      type="number"
      value={rackBays}
      onChange={(e) => dispatch(setRackBays(e.target.value))}
    />
  );

  const rackLevelsField = (
    <TextField
      size="small"
      fullWidth
      disabled={readingProcessIsRunning}
      id="rackLevelsField"
      label="Niveles"
      name="rackLevelsField"
      type="number"
      value={rackLevels}
      onChange={(e) => dispatch(setRackLevels(e.target.value))}
    />
  );
  return (
    <Collapse in={openInputs} collapsedSize={50}>
      <Grid container spacing={1} direction="row">
        {readingProcessIsRunning ? (
          <>
            <Grid item xs={12}>
              <Typography align="center" onClick={handleInputs}>
                Ubicacion Actual: {readings[currentPosition].cellBarcode?.label}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" onClick={handleInputs}>
                {openInputs ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Typography>
            </Grid>
          </>
        ) : null}
        <Grid item xs={12}>
          {readingModeToggle}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          {rackInitialPlaceField}
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          {rackBaysField}
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          {rackLevelsField}
        </Grid>
      </Grid>
    </Collapse>
  );
};
