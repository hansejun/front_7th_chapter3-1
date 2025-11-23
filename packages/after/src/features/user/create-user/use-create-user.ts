import { userService } from '@/entities/user';
import { useUsers } from '@/entities/user/use-users.hook';
import { useMutation } from '@/shared/hooks';
import { useState } from 'react';

export const useCreateUser = () => {
  const { refetch: refetchUsers } = useUsers();
  //   const { isOpenAlert, openAlert } = useAlert();

  const { mutate } = useMutation(userService.create);

  // TODO: useHookForm + zod 사용
  const [form] = useState({
    username: '',
    email: '',
    role: 'user',
    status: 'active',
  });

  const onCreateUser = (
    onSuccess?: () => void,
    onError?: (error: Error) => void,
  ) => {
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
          // 3. 성공 알럿 보여주기
        },
        onError: error => {
          // 1. 에러 알럿 보여주기 (error.message || '생성에 실패했습니다.')
          onError?.(error);
        },
      },
    );
  };

  return { form, onCreateUser };
};
