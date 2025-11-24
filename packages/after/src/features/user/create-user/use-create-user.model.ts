import { userService } from '@/entities/user';
import { useUsers } from '@/entities/user/use-users.model';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useState } from 'react';

export const useCreateUser = () => {
  const { refetch: refetchUsers } = useUsers();
  const { onOpenAlert } = useAlert();

  const { mutate } = useMutation(userService.create);

  // TODO: useHookForm + zod 사용
  const [form] = useState({
    username: '',
    email: '',
    role: 'user',
    status: 'active',
  });

  const onCreateUser = (onSuccess?: () => void, onError?: (error: Error) => void) => {
    mutate(
      {
        username: form.username,
        email: form.email,
        role: 'user',
        status: 'active',
      },
      {
        onSuccess: () => {
          refetchUsers();
          onSuccess?.();
          // 2. 폼 초기화
          onOpenAlert({ title: '성공', type: 'success', message: '사용자가 생성되었습니다.' });
        },
        onError: (error) => {
          onOpenAlert({
            title: '오류',
            type: 'error',
            message: error.message || '사용자 생성에 실패했습니다.',
          });
          onError?.(error);
        },
      }
    );
  };

  return { form, onCreateUser };
};
