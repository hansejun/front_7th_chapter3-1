interface UpdatePostFormProps {
  form: any;
  onSubmit: any;
}

export const UpdatePostForm = ({ form, onSubmit }: UpdatePostFormProps) => {
  console.log(form, onSubmit);
  return <form>업데이트 포스트 폼</form>;
};
