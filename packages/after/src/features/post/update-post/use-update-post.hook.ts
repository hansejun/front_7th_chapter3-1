import { postService, type Post } from '@/entities/post';
import { usePosts } from '@/entities/post/use-posts.hook';
import { useMutation } from '@/shared/hooks';
import { useState } from 'react';

export const useUpdatePost = (initialPost: Post) => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.update);

  // TODO: useHookForm + zod 사용
  const [form] = useState(initialPost);

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
          // 1. 모달 닫기
          // 2. selectedItem(null);
          onSuccess?.();
          // 3. form 초기화
          // 4. 성공 알럿 보여주기('게시글이 수정되었습니다.')
        },
        onError: error => {
          console.error(error);
          onError?.(error);
          // 1. 에러 알럿 보여주기 (error.message || '수정에 실패했습니다.')
        },
      },
    );
  };

  return { form, onUpdatePost };
};
