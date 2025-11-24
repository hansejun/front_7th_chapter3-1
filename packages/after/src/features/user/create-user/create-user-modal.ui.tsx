import Modal from '@/shared/ui/modal';
import { CreateUserForm } from './create-user-form.ui';
import { useCreateUser } from './use-create-user.model';
import type { BaseModalProps } from '@/shared/model/hooks';
import { Button } from '@/shared/ui/button';

interface CreateUserModalProps extends BaseModalProps {}

export const CreateUserModal = ({ onCloseModal }: CreateUserModalProps) => {
  const { form, onCreateUser } = useCreateUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateUser(onCloseModal);
  };

  return (
    <Modal onClose={onCloseModal} size="large">
      <Modal.Header>사용자 만들기</Modal.Header>
      <Modal.Content>
        <CreateUserForm form={form} onSubmit={handleSubmit} />
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={onCloseModal}>취소</Button>
        <Button onClick={() => onCreateUser(onCloseModal)}>생성</Button>
      </Modal.Footer>
    </Modal>
  );
};
