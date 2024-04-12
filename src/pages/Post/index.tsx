import { PostContent } from "./PostContent";
import { PostTitleCard } from "./PostHeader";
import { HomeContainer } from "./styles";

import { PostsProps } from "../Home";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

export function Post() {
  const [postData, setPostData] = useState<PostsProps>({} as PostsProps);
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const response = await api.get<PostsProps>(
      `/repos/HOSTAQUI/hostaqui.blog.frontend/issues/${params.issueNumber}`
    );

    setPostData(response.data);
  }, [params]);

  useEffect(() => {
    fetchPost();
  }, [params, fetchPost]);

  return (
    <HomeContainer>
      <PostTitleCard data={postData} />
      <PostContent data={postData} />
    </HomeContainer>
  );
}
