import { useEffect } from "react";
import axios from "axios";
import { Container, Box, Grid } from "@mui/material";
import { NextPage } from "next";
import { useAppDispatch } from "@/hooks";
import { setReadings } from "@/features/reading/readingsListSlice";
import { FilterPanel } from "@/components/[record-list]/FilterPanel";
import { RecordsTable } from "@/components/[record-list]/RecordsTable";
import CardView from "@/components/CardView";

const RecordList: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSnapshot();
  }, []);

  const getSnapshot = async () => {
    axios
      .get("http://localhost:5001/api/readings")
      .then((response) => {
        // setRecords(response.data);
        dispatch(setReadings(response.data));
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardView title="">
              <FilterPanel />
            </CardView>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardView title="">
              <RecordsTable />
            </CardView>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RecordList;
