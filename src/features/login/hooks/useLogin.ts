import { UsersEntity } from "@/src/shared/entities";
import { UsersWithTokenEntity } from "@/src/shared/entities/users/usersWithTokenEntity";
import { useAuthStore } from "@/src/shared/hooks/useAuthStore";
import { usePlayableCharacterStore } from "@/src/shared/hooks/usePlayableCharacterStore";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login.api";

type LoginMutationProps = {
  user: UsersEntity;
};

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const { setCharacterData } = usePlayableCharacterStore();

  const mutation = useMutation<UsersWithTokenEntity, Error, LoginMutationProps>(
    {
      mutationFn: async ({ user }) => {
        const response = await loginUser(user.email, user.password);

        if (
          response.status !== "success" ||
          !response.result.playableCharacter
        ) {
          throw new Error("LOGIN_FAILED");
        }

        return response.result;
      },

      onSuccess: (data) => {
        setAuth(data.user, data.token, data.token);

        setCharacterData(data.playableCharacter ?? {});
      },
    },
  );

  return {
    handleUserLogin: mutation.mutateAsync,

    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
