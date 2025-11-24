import { userService, type User } from '@/entities/user';
import { useUsers } from '@/entities/user/use-users.model';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useState } from 'react';

export const useUpdateUser = (initialUser: User) => {
  const { refetch: refetchUsers } = useUsers();

  const { mutate } = useMutation(userService.update);
  const { onOpenAlert } = useAlert();

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
          onOpenAlert({ title: '성공', type: 'success', message: '사용자가 수정되었습니다.' });
        },
        onError: (error) => {
          console.error(error);
          onError?.(error);
          onOpenAlert({
            title: '오류',
            type: 'error',
            message: error.message || '수정에 실패했습니다.',
          });
        },
      }
    );
  };

  return { form, onUpdateUser };
};
