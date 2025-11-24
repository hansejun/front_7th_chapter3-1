import type { Post } from '@/entities/post';
import { useUpdatePost } from './use-update-post.model';
import { UpdatePostForm } from './update-post-form.ui';
import type { BaseModalProps } from '@/shared/model/hooks';

interface UpdatePostModalProps extends BaseModalProps {
  post: Post;
}

export const UpdatePostModal = ({
  post,
  onCloseModal,
}: UpdatePostModalProps) => {
  const { form, onUpdatePost } = useUpdatePost(post);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onUpdatePost({
      onSuccess: () => {
        onCloseModal();
      },
    });
  };
  return (
    <div>
      <UpdatePostForm form={form} onSubmit={handleSubmit} />
    </div>
  );
};
