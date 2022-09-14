import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Main: FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ margin: "20px" }}>
      <Typography variant={"h1"}>Main Page</Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/login")}
        sx={{ margin: "10px" }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/profile")}
        sx={{ margin: "10px" }}
      >
        Profile
      </Button>
    </Box>
  );
};
