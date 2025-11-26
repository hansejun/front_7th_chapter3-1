import { postService, createPostSchema, type CreatePostFormData } from '@/entities/post';
import { usePosts } from '@/entities/post/use-posts.model';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { POST_CATEGORIES_MAP, POST_STATUSES_MAP } from '@/entities/post/post-constants.config';

export const useCreatePost = () => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.create);
  const { onOpenAlert } = useAlert();

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
      category: POST_CATEGORIES_MAP.development,
      status: POST_STATUSES_MAP.draft,
    },
  });

  const onCreatePost = (
    data: CreatePostFormData,
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ) => {
    mutate(data, {
      onSuccess: () => {
        refetchPosts();
        onSuccess?.();
        form.reset(); // 폼 초기화
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
    });
  };

  return { form, onCreatePost };
};
