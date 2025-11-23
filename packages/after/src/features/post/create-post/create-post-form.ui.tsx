interface CreatePostFormProps {
  form: any;
  onSubmit: any;
}

export const CreatePostForm = ({ form, onSubmit }: CreatePostFormProps) => {
  console.log(form, onSubmit);
  return <form></form>;
};
