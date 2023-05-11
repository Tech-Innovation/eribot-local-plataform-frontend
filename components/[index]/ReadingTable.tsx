import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomButton from "../CustomButton";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useWebSocket from "react-use-websocket";
import {
  BarcodeSource,
  BarcodeStatus,
  LoadUnitBarcodeOrigin,
} from "@/features/reading/currentReadingSlice";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { setLoadUnitsBarcodes } from "@/features/reading/readingProcessSlice";

interface IReadingTable {
  [key: string]: any;
}

export const ReadingTable = (props: IReadingTable) => {
  const dispatch = useAppDispatch();

  const { lastMessage: readingLastMessage } = useWebSocket("ws://localhost:1880/ws/message");

  const readingIsRunning = useAppSelector((state) => state.readingProcess.isRunning);
  const readings = useAppSelector((state) => state.readingProcess.readings);
  const currentPosition = useAppSelector((state) => state.readingProcess.currentPosition);

  useEffect(() => {
    // console.log({ readingLastMessage });
    if (readingLastMessage !== null && readingIsRunning) {
      let reading = readingLastMessage.data;
      const labelExists = readings.some((currentState) =>
        currentState.loadUnitsBarcodes.some((loadUnitBarcode) => loadUnitBarcode.label === reading)
      );
      console.log({ reading, labelExists });

      if (!labelExists) {
        var date = new Date();
        let loadUnitBarcode = {
          label: reading,
          status: BarcodeStatus.Readble,
          source: BarcodeSource.FromScanner,
          origin: LoadUnitBarcodeOrigin.Pallet,
          date: date.toLocaleString(),
        };
        dispatch(setLoadUnitsBarcodes(loadUnitBarcode));
      }
    }
  }, [readingLastMessage]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell align="right">Lectura</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {readings[currentPosition]?.loadUnitsBarcodes.map((loadUnitBarcode) => (
            <TableRow key={readings[currentPosition]?.loadUnitsBarcodes.indexOf(loadUnitBarcode)}>
              <TableCell component="th" scope="row">
                {loadUnitBarcode.status === 0
                  ? LoadUnitBarcodeOrigin[loadUnitBarcode.origin!]
                  : loadUnitBarcode.status === 1
                  ? "Et. Def."
                  : "Vacio"}
              </TableCell>
              <TableCell align="right">{loadUnitBarcode.label}</TableCell>
              <TableCell align="right">
                <RadioButtonCheckedIcon
                  color={
                    loadUnitBarcode.status === BarcodeStatus.Readble
                      ? "primary"
                      : loadUnitBarcode.status === BarcodeStatus.Unreadable
                      ? "warning"
                      : "error"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
