import { FormInput, FormSelect, FormTextarea } from '@/shared/components/molecules';

interface CreatePostFormProps {
  form: any;
  onSubmit: any;
  onChangeForm: (name: string, value: string) => void;
}

export const CreatePostForm = ({ form, onChangeForm, onSubmit }: CreatePostFormProps) => {
  console.log(form, onSubmit);
  return (
    <>
      <FormInput
        name="title"
        value={form.title || ''}
        onChange={(value) => onChangeForm('title', value)}
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
        width="full"
        fieldType="postTitle"
      />
      <div className="gap-md grid grid-cols-2">
        <FormInput
          name="author"
          value={form.author || ''}
          onChange={(value) => onChangeForm('author', value)}
          label="작성자"
          placeholder="작성자명"
          required
          width="full"
        />
        <FormSelect
          name="category"
          value={form.category || ''}
          onChange={(value) => onChangeForm('category', value)}
          options={[
            { value: 'development', label: 'Development' },
            { value: 'design', label: 'Design' },
            { value: 'accessibility', label: 'Accessibility' },
          ]}
          label="카테고리"
          placeholder="카테고리 선택"
          size="md"
        />
      </div>
      <FormTextarea
        name="content"
        value={form.content || ''}
        onChange={(value) => onChangeForm('content', value)}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </>
  );
};
