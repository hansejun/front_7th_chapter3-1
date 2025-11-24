import { postService } from '@/entities/post';
import { usePosts } from '@/entities/post/use-posts.model';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useState } from 'react';

export const useCreatePost = () => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.create);
  const { onOpenAlert } = useAlert();

  // TODO: useHookForm + zod 사용
  const [form] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    status: 'draft',
  });

  const onCreatePost = (onSuccess?: () => void, onError?: (error: Error) => void) => {
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
          onOpenAlert({ title: '성공', type: 'success', message: '게시글이 생성되었습니다.' });
        },
        onError: (error) => {
          onError?.(error);
          onOpenAlert({
            title: '오류',
            type: 'error',
            message: error.message || '생성에 실패했습니다.',
          });
        },
      }
    );
  };

  return { form, onCreatePost };
};
