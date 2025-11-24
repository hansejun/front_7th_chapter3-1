import { CreatePostForm } from './create-post-form.ui';
import { useCreatePost } from './use-create-post.model';
import type { BaseModalProps } from '@/shared/model/hooks';

interface CreatePostModalProps extends BaseModalProps {}

export const CreatePostModal = ({ onCloseModal }: CreatePostModalProps) => {
  const { form, onCreatePost } = useCreatePost();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreatePost(onCloseModal);
  };

  return (
    <div>
      <CreatePostForm form={form} onSubmit={handleSubmit} />
    </div>
  );
};
