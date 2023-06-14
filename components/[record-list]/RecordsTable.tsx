import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Key } from "react";
import { useAppSelector } from "../../hooks";
import { ICellBarcode, ILoadUnitBarcode } from "@/features/reading/currentReadingSlice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
interface IReadingTable {
  [key: string]: any;
}

export const RecordsTable = (props: IReadingTable) => {
  const readingsLists = useAppSelector((state) => state.readingsList.readings);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cloud</TableCell>
            <TableCell>Ubicacion</TableCell>
            <TableCell>Lectura</TableCell>
            <TableCell align="right">Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {readingsLists.map(
            (
              row: {
                cellBarcode: ICellBarcode;
                loadUnitsBarcodes: ILoadUnitBarcode[];
                isInFirebase: boolean;
              },
              index: Key | null | undefined
            ) => (
              <>
                <TableRow key={index} sx={{ borderTop: "3px solid rgba(224, 224, 224, 1)" }}>
                  <TableCell width={10}>
                    {row.isInFirebase ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
                  <TableCell>{row.cellBarcode.label}</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">{row.cellBarcode.date}</TableCell>
                </TableRow>
                {row.loadUnitsBarcodes.map(
                  (loadUnitBarcode: ILoadUnitBarcode, index: Key | null | undefined) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {loadUnitBarcode.status == 1
                          ? "Eti. Def."
                          : loadUnitBarcode.status == 2
                          ? "Vacio"
                          : loadUnitBarcode.label}
                      </TableCell>
                      <TableCell align="right">{loadUnitBarcode.date}</TableCell>
                    </TableRow>
                  )
                )}
              </>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
