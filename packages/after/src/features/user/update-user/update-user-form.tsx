interface UpdateUserFormProps {
  form: any;
  onSubmit: any;
}

export const UpdateUserForm = ({ form, onSubmit }: UpdateUserFormProps) => {
  console.log(form, onSubmit);
  return <form>업데이트 유저 폼</form>;
};
