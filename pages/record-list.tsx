import CardView from "@/components/CardView";
import { ICellBarcode, ILoadUnitBarcode } from "@/features/reading/currentReadingSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { NextPage } from "next";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";

const RecordList: NextPage = () => {
  const [records, setRecords] = useState<any>([]);

  useEffect(() => {
    getSnapshot();
  }, []);

  useEffect(() => {
    console.log(records);
  }, [records]);

  const getSnapshot = async () => {
    axios
      .get("http://localhost:5000/api/readings")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      <Container maxWidth={false}>
        <CardView title="">
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
                {records.map(
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
        </CardView>
      </Container>
    </Box>
  );
};

export default RecordList;
