import { createContext, useContext } from 'react';
import type { Post } from './post-type.model';
import { useQuery } from '@/shared/hooks';
import { postService } from './post-service.api';

interface PostsContextValue {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const PostsContext = createContext<PostsContextValue | null>(null);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery(postService.getAll);

  const returnValue: PostsContextValue = {
    posts: posts ?? [],
    isLoading,
    error,
    refetch,
  };

  return (
    <PostsContext.Provider value={returnValue}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('포스트 프로바이더 내부에서 사용해야함');
  }

  const { posts, isLoading, error, refetch } = context;

  return { posts, isLoading, error, refetch };
};
