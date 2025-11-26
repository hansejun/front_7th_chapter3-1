import { FormInput, FormSelect } from '@/shared/components/molecules';

interface UpdateUserFormProps {
  form: any;
  onSubmit: any;
  onChangeForm: (name: string, value: string) => void;
}

export const UpdateUserForm = ({ form, onChangeForm, onSubmit }: UpdateUserFormProps) => {
  return (
    <>
      <FormInput
        name="username"
        value={form.username || ''}
        onChange={(value) => onChangeForm('username', value)}
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
        width="full"
        fieldType="username"
      />
      <FormInput
        name="email"
        value={form.email || ''}
        onChange={(value) => onChangeForm('email', value)}
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
        width="full"
        fieldType="email"
      />
      <div className="gap-md grid grid-cols-2">
        <FormSelect
          name="role"
          value={form.role || 'user'}
          onChange={(value) => onChangeForm('role', value)}
          options={[
            { value: 'user', label: '사용자' },
            { value: 'moderator', label: '운영자' },
            { value: 'admin', label: '관리자' },
          ]}
          label="역할"
          size="md"
        />
        <FormSelect
          name="status"
          value={form.status || 'active'}
          onChange={(value) => onChangeForm('status', value)}
          options={[
            { value: 'active', label: '활성' },
            { value: 'inactive', label: '비활성' },
            { value: 'suspended', label: '정지' },
          ]}
          label="상태"
          size="md"
        />
      </div>
    </>
  );
};
