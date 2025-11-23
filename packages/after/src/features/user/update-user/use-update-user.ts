import { userService, type User } from '@/entities/user';
import { useUsers } from '@/entities/user/use-users.hook';
import { useMutation } from '@/shared/hooks';
import { useState } from 'react';

interface UpdateUserProps {
  initialUser: User;
}

export const useUpdateUser = (initialUser: User) => {
  const { refetch: refetchUsers } = useUsers();

  const { mutate } = useMutation(userService.update);

  // TODO: useHookForm + zod 사용
  const [form] = useState(initialUser);

  const onUpdateUser = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }) => {
    mutate(
      { id: initialUser.id, userData: form },
      {
        onSuccess: () => {
          refetchUsers();
          // 1. 모달 닫기
          // 2. selectedItem(null);
          onSuccess?.();
          // 3. form 초기화
          // 4. 성공 알럿 보여주기('사용자가 수정되었습니다.')
        },
        onError: error => {
          console.error(error);
          onError?.(error);
          // 1. 에러 알럿 보여주기 (error.message || '수정에 실패했습니다.')
        },
      },
    );
  };

  return { form, onUpdateUser };
};
