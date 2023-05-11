import { ReactNode } from "react";
import { Paper, Typography } from "@mui/material";

interface CardViewProps {
  title: string;
  children: ReactNode;
  [key: string]: any;
}

const CardView = (props: CardViewProps) => {
  return (
    <Paper sx={{ px: 2, pb: 2, pt: 1 }} {...props.rest}>
      <Typography variant="h6" component="div" sx={{ mb: 1 }}>
        {props.title}
      </Typography>
      {props.children}
    </Paper>
  );
};

export default CardView;
