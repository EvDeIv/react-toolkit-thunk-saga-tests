import { FC } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { v4 } from "uuid";
import { PostItem } from "./PostItem";
import { IPost } from "../../../types";

interface IPostsContainer {
  data: IPost[] | undefined;
  isLoading: boolean;
  name: string;
}

export const PostsContainer: FC<IPostsContainer> = ({
  name,
  data,
  isLoading,
}) => {
  return (
    <Box sx={{ margin: "20px" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {name}
      </Typography>
      {data?.length &&
        data.map((post: IPost) => <PostItem post={post} key={v4()} />)}
      {isLoading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClimbingBoxLoader />
        </Box>
      )}
    </Box>
  );
};
