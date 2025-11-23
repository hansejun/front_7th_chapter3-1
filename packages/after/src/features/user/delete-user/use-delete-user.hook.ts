import { userService } from '@/entities/user';
import { useUsers } from '@/entities/user/use-users.hook';
import { useMutation } from '@/shared/hooks';

export const useDeleteUser = () => {
  const { refetch: refetchUsers } = useUsers();

  const { mutate } = useMutation(userService.delete);

  const onDeleteUser = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        refetchUsers();
        // 1. 성공 알럿 보여주기 ('삭제되었습니다.')
      },
      onError: error => {
        // 2. 에러 알럿 보여주기 (error.message || '삭제에 실패했습니다.')
      },
    });
  };
  return { onDeleteUser };
};
