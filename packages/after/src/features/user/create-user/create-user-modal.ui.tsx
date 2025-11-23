import { CreateUserForm } from './create-user-form.ui';
import { useCreateUser } from './use-create-user.hook';

interface CreateUserModalProps {
  onCloseModal: () => void;
}

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
