import { CreatePostForm } from './create-post-form.ui';
import { useCreatePost } from './use-create-post.model';

interface CreatePostModalProps {
  onCloseModal: () => void;
}

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
