import { postService, type Post } from '@/entities/post';
import { usePosts } from '@/entities/post/use-posts.model';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useState } from 'react';

export const useUpdatePost = (initialPost: Post) => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.update);
  const { onOpenAlert } = useAlert();

  // TODO: useHookForm + zod 사용
  const [form, setForm] = useState(initialPost);

  const onChangeForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const onUpdatePost = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }) => {
    mutate(
      { id: initialPost.id, postData: form },
      {
        onSuccess: () => {
          refetchPosts();
          // 2. selectedItem(null);
          onSuccess?.();
          // 3. form 초기화
          onOpenAlert({ title: '성공', type: 'success', message: '게시글이 수정되었습니다.' });
        },
        onError: (error) => {
          console.error(error);
          onError?.(error);
          onOpenAlert({
            title: '오류',
            type: 'error',
            message: error.message || '수정에 실패했습니다.',
          });
        },
      }
    );
  };

  return { form, onUpdatePost, onChangeForm };
};
