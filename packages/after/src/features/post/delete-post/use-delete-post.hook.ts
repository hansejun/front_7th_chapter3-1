import { postService } from '@/entities/post';
import { usePosts } from '@/entities/post/use-posts.hook';
import { useMutation } from '@/shared/hooks';

export const useDeletePost = () => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.delete);

  const onDeletePost = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        refetchPosts();
        // 1. 성공 알럿 보여주기 ('삭제되었습니다.')
      },
      onError: error => {
        // 2. 에러 알럿 보여주기 (error.message || '삭제에 실패했습니다.')
      },
    });
  };
  return { onDeletePost };
};
