/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostCard } from "./components/PostCard";
import { ProfileCard } from "./components/Profile";
import { SearchInput } from "./components/SearchInput";
import { HomeContainer, PostCardGrid, SkeletonGrid } from "./styles";

import { api } from "../../lib/axios";
import { useCallback, useEffect, useState } from "react";
import { PostCardSkeleton } from "./components/PostCardSkeleton";
import { ProfileCardSkeleton } from "./components/ProfileSkeleton";

export interface UserProps {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface PostsProps {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: UserProps;
  labels: any[];
  state: string;
  locked: boolean;
  assignee: any;
  assignees: any[];
  milestone: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  body: string;
  reactions: {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  performed_via_github_app: any;
  state_reason: string | null;
}

interface SearchPostsProps {
  items: PostsProps[];
}

export function Home() {
  const [posts, setPosts] = useState<PostsProps[]>([]);

  const postsLength = posts.length;

  const fetchPosts = useCallback(async (query?: string) => {
    const response = await api.get<SearchPostsProps>(
      `search/issues?q=${
        query ? query + "%20" : ""
      }repo:HOSTAQUI/hostaqui.blog.frontend
      `
    );

    setPosts(response.data.items);
    console.log(response.data.items);
  }, []);

  let numberOfPostsText: string;
  if (postsLength > 1) {
    numberOfPostsText = "publicações";
  } else {
    numberOfPostsText = "publicação";
  }

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <HomeContainer>
      {posts.length > 0 ? <ProfileCard /> : <ProfileCardSkeleton />}
      <SearchInput
        postsLength={postsLength}
        fetchPosts={fetchPosts}
        numberOfPostsText={numberOfPostsText}
      />
      <PostCardGrid>
        {posts.length > 0 ? (
          posts.map((post) => {
            return <PostCard key={post.number} data={post} />;
          })
        ) : (
          <SkeletonGrid>
            <PostCardSkeleton />
            <PostCardSkeleton />
          </SkeletonGrid>
        )}
      </PostCardGrid>
    </HomeContainer>
  );
}
