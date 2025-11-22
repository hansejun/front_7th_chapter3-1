export const useGetUsers = () => {
  // TODO: 이런식으로 사용하고 싶음
  //   const { data, isLoading, error } = useFetch<User[]>(userService.getAll());
  //   return { data, isLoading, error };

  const data = {
    users: [],
    isLoading: false,
    error: null,
  };

  return { users: data.users, isLoading: data.isLoading, error: data.error };
};
