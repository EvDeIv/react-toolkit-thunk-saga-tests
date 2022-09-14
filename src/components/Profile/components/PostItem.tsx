import { FC } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IPost } from "../../../types";

interface PropTypes {
  post: IPost;
}

export const PostItem: FC<PropTypes> = ({ post }) => {
  const { title } = post;
  return (
    <Box sx={{ border: "1px solid blue", marginBottom: "10px" }}>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};
