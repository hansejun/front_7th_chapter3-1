interface CreateUserFormProps {
  form: any;
  onSubmit: any;
}

export const CreateUserForm = ({ form, onSubmit }: CreateUserFormProps) => {
  console.log(form, onSubmit);
  return <form></form>;
};
