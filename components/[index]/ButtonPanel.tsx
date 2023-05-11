import { Grid } from "@mui/material";
import CustomButton from "../CustomButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { readingProcess } from "@/features/reading/readingProcessSlice";
import { readingNotification } from "@/features/reading/readingNotificationSlice";
import axios from "axios";
import { rackInitialPlaceRegex } from "@/utils/constants";
import {
  BarcodeSource,
  BarcodeStatus,
  LoadUnitBarcodeOrigin,
} from "@/features/reading/currentReadingSlice";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDBLkM_3EkF9JQdgxEBea_qdSii7GypW4U",
  authDomain: "eribot-sub-plataform.firebaseapp.com",
  projectId: "eribot-sub-plataform",
  storageBucket: "eribot-sub-plataform.appspot.com",
  messagingSenderId: "523472517712",
  appId: "1:523472517712:web:20436c9353b0b6258d2f55",
};

interface IButtonPanelProps {
  [key: string]: any;
}

async function startProcess() {
  await axios.post("http://192.168.18.44:1880/prueba", {
    multi: true,
  });
}

async function endProcess() {
  await axios.post("http://192.168.18.44:1880/prueba", {
    multi: false,
  });
}

export const ButtonPanel = (props: IButtonPanelProps) => {
  const dispatch = useAppDispatch();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const readingProcessIsRunning = useAppSelector((state) => state.readingProcess.isRunning);
  const readingProcessIsPaused = useAppSelector((state) => state.readingProcess.isPaused);
  const vectorDirection = useAppSelector((state) => state.readingProcess.vectorDirection);
  const rackInitialPlace = useAppSelector((state) => state.readingProcess.rackInitialPlace);
  const rackLevels = useAppSelector((state) => state.readingProcess.rackLevels);
  const rackBays = useAppSelector((state) => state.readingProcess.rackBays);
  const readings = useAppSelector((state) => state.readingProcess.readings);
  const currentPosition = useAppSelector((state) => state.readingProcess.currentPosition);

  const webSocketIsConnected = useAppSelector((state) => state.connection.webSocketIsConnected);
  const cameraIsConnected = useAppSelector((state) => state.connection.cameraIsConnected);

  const startReadingButton = (
    <CustomButton
      text="Iniciar"
      disabled={readingProcessIsPaused}
      color="primary"
      event={async () => {
        await startProcess();

        if (!webSocketIsConnected) {
          dispatch(readingNotification.actions.setSeverity("error"));
          dispatch(readingNotification.actions.setMessage("No hay conexión con el WebSocket"));
          dispatch(readingNotification.actions.open());
          return;
        }

        if (!cameraIsConnected) {
          dispatch(readingNotification.actions.setSeverity("error"));
          dispatch(readingNotification.actions.setMessage("No hay conexión con la cámara"));
          dispatch(readingNotification.actions.open());
          return;
        }

        if (!rackInitialPlace.match(rackInitialPlaceRegex)) {
          dispatch(readingNotification.actions.setSeverity("error"));
          dispatch(readingNotification.actions.setMessage("Ubicacion inicial no válida"));
          dispatch(readingNotification.actions.open());
          return;
        }

        if (parseInt(rackBays) < 1) {
          dispatch(readingNotification.actions.setSeverity("error"));
          dispatch(readingNotification.actions.setMessage("Columnas no válidas"));
          dispatch(readingNotification.actions.open());
          return;
        }

        if (parseInt(rackLevels) < 1) {
          dispatch(readingNotification.actions.setSeverity("error"));
          dispatch(readingNotification.actions.setMessage("Filas no válidas"));
          dispatch(readingNotification.actions.open());
          return;
        }

        var rackInitialPlaceArray = rackInitialPlace.split("-");

        var grupo = rackInitialPlaceArray[0];
        var pasillo = rackInitialPlaceArray[1];
        var bay_ = rackInitialPlaceArray[2];
        var level_ = rackInitialPlaceArray[3];
        var bayStep = 2;

        var bay = parseInt(bay_);
        var level = parseInt(level_);
        var cols_ = parseInt(rackBays);
        var rows_ = parseInt(rackLevels);

        var locations_ = [];
        for (let i = 0; i < rows_; i++) {
          var locations_row = [];
          for (let j = 0; j < cols_; j++) {
            var bay_str = (bay + j * bayStep).toString().padStart(3, "0");
            var level_str = (level + i).toString().padStart(2, "0");
            locations_row.push(`${grupo}-${pasillo}-${bay_str}-${level_str}`);
          }
          locations_.push(locations_row);
        }

        var locations__ = [];
        if (vectorDirection === "horizontal") {
          for (let i = 0; i < rows_; i++) {
            for (let j = 0; j < cols_; j++) {
              let j_ = i % 2 === 0 ? j : cols_ - j - 1;
              locations__.push(locations_[i][j_]);
            }
          }
        }
        if (vectorDirection === "vertical") {
          for (let j = 0; j < cols_; j++) {
            for (let i = 0; i < rows_; i++) {
              let i_ = j % 2 === 0 ? i : rows_ - i - 1;
              locations__.push(locations_[i_][j]);
            }
          }
        }

        let cellBarcodeList = locations__.map((location) => {
          let date = new Date();
          return {
            label: location,
            source: BarcodeSource.FromPlataform,
            status: BarcodeStatus.Readble,
            date: date.toLocaleString(),
          };
        });

        console.log({ vectorDirection, rackInitialPlace, rackBays, rackLevels });
        console.log({ cellBarcodeList });

        dispatch(readingProcess.actions.setCellsBarcodes(cellBarcodeList));
        dispatch(readingProcess.actions.start());
      }}
    />
  );

  const stopReadingButton = (
    <CustomButton
      text="Detener"
      disabled={readingProcessIsPaused}
      color="error"
      event={async () => {
        dispatch(readingProcess.actions.stop());

        await endProcess();
      }}
    />
  );

  const pauseReadingButton = (
    <CustomButton
      text="Pausar"
      disabled={false}
      color="primary"
      event={() => {
        dispatch(readingProcess.actions.pause());
      }}
    />
  );

  const resumeReadingButton = (
    <CustomButton
      text="Reanudar"
      disabled={false}
      color="primary"
      event={() => {
        dispatch(readingProcess.actions.resume());
      }}
    />
  );

  const emptyCellButton = (
    <CustomButton
      text="Vacio"
      disabled={readingProcessIsPaused}
      color="warning"
      event={() => {
        let date = new Date();
        let loadUnitBarcode = {
          label: "",
          status: BarcodeStatus.Empty,
          source: BarcodeSource.FromPlataform,
          origin: LoadUnitBarcodeOrigin.Any,
          date: date.toLocaleString(),
        };
        dispatch(readingProcess.actions.setLoadUnitsBarcodes(loadUnitBarcode));
      }}
    />
  );

  const unreadableLabelButton = (
    <CustomButton
      text="Et. Def."
      disabled={readingProcessIsPaused}
      color="warning"
      event={() => {
        let date = new Date();
        let loadUnitBarcode = {
          label: "",
          status: BarcodeStatus.Unreadable,
          source: BarcodeSource.FromPlataform,
          origin: LoadUnitBarcodeOrigin.Any,
          date: date.toLocaleString(),
        };
        dispatch(readingProcess.actions.setLoadUnitsBarcodes(loadUnitBarcode));
      }}
    />
  );

  const finishCellReadingButton = (
    <CustomButton
      text={currentPosition === readings.length - 1 ? "Finish" : "Next"}
      disabled={readingProcessIsPaused}
      color="success"
      event={() => {
        let currentReading = readings[currentPosition];
        console.log(currentReading);
        try {
          // addDoc(collection(db, "lecturas"), currentReading);
          axios
            .post("http://localhost:5000/api/readings/", currentReading)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          dispatch(readingNotification.actions.setSeverity("error"));
          dispatch(readingNotification.actions.setMessage("No hay conexión con Servidor"));
          dispatch(readingNotification.actions.open());
          return;
        }

        if (currentPosition === readings.length - 1) {
          dispatch(readingProcess.actions.stop());
          return;
        }

        dispatch(readingProcess.actions.nextPosition());
      }}
    />
  );

  return (
    <Grid container spacing={1}>
      {!readingProcessIsRunning ? (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {startReadingButton}
        </Grid>
      ) : (
        <>
          <Grid item xs={6} sm={6} md={6} lg={3}>
            {stopReadingButton}
          </Grid>
          {!readingProcessIsPaused ? (
            <Grid item xs={6} sm={6} md={6} lg={3}>
              {pauseReadingButton}
            </Grid>
          ) : (
            <Grid item xs={6} sm={6} md={6} lg={3}>
              {resumeReadingButton}
            </Grid>
          )}
          <Grid item xs={4} sm={4} md={4} lg={2}>
            {emptyCellButton}
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={2}>
            {unreadableLabelButton}
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={2}>
            {finishCellReadingButton}
          </Grid>
        </>
      )}
    </Grid>
  );
};
