import type { Post } from '@/entities/post';
import { useUpdatePost } from './use-update-post.hook';
import { UpdatePostForm } from './update-post-form.ui';

interface UpdatePostModalProps {
  post: Post;
  onCloseModal: () => void;
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
