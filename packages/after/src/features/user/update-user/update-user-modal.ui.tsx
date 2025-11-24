import type { User } from '@/entities/user';
import { useUpdateUser } from './use-update-user.model';
import { UpdateUserForm } from './update-user-form.ui';

interface UpdateUserModalProps {
  user: User;
  onCloseModal: () => void;
}

export const UpdateUserModal = ({
  user,
  onCloseModal,
}: UpdateUserModalProps) => {
  const { form, onUpdateUser } = useUpdateUser(user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onUpdateUser({
      onSuccess: () => {
        onCloseModal();
      },
    });
  };
  return (
    <div>
      <UpdateUserForm form={form} onSubmit={handleSubmit} />
    </div>
  );
};
