import { NextPage } from "next";
import { Box, Container, Grid } from "@mui/material";
import CardView from "@components/CardView";
import { ButtonPanel } from "@/components/[index]/ButtonPanel";
import { ReadingTable } from "@/components/[index]/ReadingTable";
import { StatusIndicators } from "@/components/[index]/StatusIndicators";
import { InputPanel } from "@/components/[index]/InputPanel";
import CustomSnackBar from "@/components/CustomSnackBar";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { close } from "@/features/reading/readingNotificationSlice";

const InventoryRegistrationPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const notificationIsOpen = useAppSelector((state) => state.readingNotification.isOpen);
  const notificationMessage = useAppSelector((state) => state.readingNotification.message);
  const notificationSeverity = useAppSelector((state) => state.readingNotification.severity);

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
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardView title="">
                  <StatusIndicators />
                </CardView>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardView title="">
                  <InputPanel />
                </CardView>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardView title="">
                  <ButtonPanel />
                </CardView>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardView title="graph">{}</CardView>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardView title="current reading">
                  <ReadingTable />
                </CardView>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CardView title="Card 3">{}</CardView>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
      <CustomSnackBar
        open={notificationIsOpen}
        onClose={(_, reason) => {
          if (reason === "clickaway") {
            return;
          }
          dispatch(close());
        }}
        message={notificationMessage}
        duration={5000}
        severity={notificationSeverity}
      />
    </Box>
  );
};

export default InventoryRegistrationPage;
