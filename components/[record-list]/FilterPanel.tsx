import { Grid } from "@mui/material";
import CustomButton from "../CustomButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { ICellBarcode, ILoadUnitBarcode } from "@/features/reading/currentReadingSlice";

interface IFilterPanelProps {
  [key: string]: any;
}

type Readings = {
  cellBarcode: ICellBarcode;
  loadUnitsBarcodes: ILoadUnitBarcode[];
  isInFirebase: boolean;
};

export const FilterPanel = (props: IFilterPanelProps) => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const readingsLists = useAppSelector((state) => state.readingsList.readings);

  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  }, [startDate, endDate]);

  const exportAsExcelButton = (
    <CustomButton
      text="Exportar"
      color="primary"
      event={async () => {
        let csvContent = "#, Cloud, Ubicacion, Lectura, Fecha\n";
        readingsLists.forEach((reading: Readings, index) => {
          console.log(reading);
          console.log(reading.cellBarcode);
          console.log(reading.loadUnitsBarcodes);
          reading.loadUnitsBarcodes.forEach((loadUnitBarcode: ILoadUnitBarcode) => {
            csvContent += `${index + 1}, ${reading.isInFirebase ? "Si" : "No"}, ${
              reading.cellBarcode.label
            }, ${
              loadUnitBarcode.status == 1
                ? "Eti. Def."
                : loadUnitBarcode.status == 2
                ? "Vacio"
                : loadUnitBarcode.label
            }, ${loadUnitBarcode.date}\n`;
          });
        });
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    />
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha Inicio"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha Fin"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        {exportAsExcelButton}
      </Grid>
    </Grid>
  );
};
