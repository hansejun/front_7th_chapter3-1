import { CreateUserForm } from './create-user-form.ui';
import { useCreateUser } from './use-create-user.model';
import type { BaseModalProps } from '@/shared/model/hooks';

interface CreateUserModalProps extends BaseModalProps {}

export const CreateUserModal = ({ onCloseModal }: CreateUserModalProps) => {
  const { form, onCreateUser } = useCreateUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateUser(onCloseModal);
  };

  return (
    <div>
      <CreateUserForm form={form} onSubmit={handleSubmit} />
    </div>
  );
};
