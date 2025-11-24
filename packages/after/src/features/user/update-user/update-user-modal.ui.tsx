import type { User } from '@/entities/user';
import { useUpdateUser } from './use-update-user.model';
import { UpdateUserForm } from './update-user-form.ui';
import type { BaseModalProps } from '@/shared/model/hooks';
import Modal from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';

interface UpdateUserModalProps extends BaseModalProps {
  user: User;
}

export const UpdateUserModal = ({ user, onCloseModal }: UpdateUserModalProps) => {
  const { form, onUpdateUser } = useUpdateUser(user);

  const handleSubmit = () => {
    onUpdateUser({
      onSuccess: () => {
        onCloseModal();
      },
    });
  };
  return (
    <Modal onClose={onCloseModal} size="large">
      <Modal.Header>사용자 수정</Modal.Header>
      <Modal.Content>
        <UpdateUserForm form={form} onSubmit={handleSubmit} />
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={onCloseModal}>취소</Button>
        <Button onClick={() => handleSubmit()}>수정 완료</Button>
      </Modal.Footer>
    </Modal>
  );
};
