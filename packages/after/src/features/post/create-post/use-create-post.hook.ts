import { postService } from '@/entities/post';
import { usePosts } from '@/entities/post/use-posts.hook';
import { useMutation } from '@/shared/hooks';
import { useState } from 'react';

export const useCreatePost = () => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.create);

  // TODO: useHookForm + zod 사용
  const [form] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    status: 'draft',
  });

  const onCreatePost = (
    onSuccess?: () => void,
    onError?: (error: Error) => void,
  ) => {
    mutate(
      {
        title: form.title,
        content: form.content,
        author: form.author,
        category: form.category,
        status: 'draft',
      },
      {
        onSuccess: () => {
          refetchPosts();
          onSuccess?.();
          // 2. 폼 초기화
          // 3. 성공 알럿 보여주기
        },
        onError: error => {
          // 1. 에러 알럿 보여주기 (error.message || '생성에 실패했습니다.')
          onError?.(error);
        },
      },
    );
  };

  return { form, onCreatePost };
};
