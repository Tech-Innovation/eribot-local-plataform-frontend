import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import useWebSocket, { ReadyState } from "react-use-websocket";
import StatusTextField from "../StatusTextField";
import {
  setWebSocketConnectionStatus,
  setCameraConnectionStatus,
} from "@/features/connection/connectionSlice";
import * as mqtt from "mqtt";

interface IStatusIndicators {
  [key: string]: any;
}

export const StatusIndicators = (props: IStatusIndicators) => {
  const dispatch = useAppDispatch();

  const { readyState: readingReadyState } = useWebSocket("ws://localhost:1880/ws/message");
  const readingConnectionStringStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readingReadyState];

  const { lastMessage: cameraLastMessage } = useWebSocket("ws://localhost:1880/ws/camera");

  const [cameraTimeStamp, setCameraTimeStamp] = useState(-2000);
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

  const [cameraConnectionStringStatus, setCameraConnectionStringStatus] = useState("Closed");

  useEffect(() => {
    if (cameraLastMessage != null) setCameraTimeStamp(Date.now().valueOf());
  }, [cameraLastMessage, setCameraTimeStamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      var now = Date.now().valueOf();
      setCurrentTimeStamp(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTimeStamp - cameraTimeStamp < 1500) {
      setCameraConnectionStringStatus("Open");
      dispatch(setCameraConnectionStatus(true));
    } else {
      setCameraConnectionStringStatus("Close");
      dispatch(setCameraConnectionStatus(false));
    }
  }, [cameraTimeStamp, currentTimeStamp, dispatch]);

  useEffect(() => {
    if (readingConnectionStringStatus === "Open") {
      dispatch(setWebSocketConnectionStatus(true));
    } else {
      dispatch(setWebSocketConnectionStatus(false));
    }
  }, [readingConnectionStringStatus, dispatch]);

  const [client, setClient] = useState<mqtt.Client>();
  const [connectStatus, setConnectStatus] = useState("Disconnected");
  const [payload, setPayload] = useState<{ topic: string; message: string }>();
  const [isSub, setIsSub] = useState(false);

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <StatusTextField text="WebSocket" status={readingConnectionStringStatus} />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <StatusTextField text="Camera" status={cameraConnectionStringStatus} />
      </Grid>
    </Grid>
  );
};
