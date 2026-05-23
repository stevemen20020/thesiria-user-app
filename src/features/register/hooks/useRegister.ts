import { PlayableCharacterEntity, UsersEntity } from "@/src/shared/entities";
import { UsersWithTokenEntity } from "@/src/shared/entities/users/usersWithTokenEntity";
import { useAuthStore } from "@/src/shared/hooks/useAuthStore";
import { usePlayableCharacterStore } from "@/src/shared/hooks/usePlayableCharacterStore";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/register.api";

type RegisterMutationProps = {
  user: UsersEntity;
  character: PlayableCharacterEntity;
};

export const useRegister = () => {
  const { setAuth } = useAuthStore();
  const { setCharacterData } = usePlayableCharacterStore();

  const mutation = useMutation<
    UsersWithTokenEntity,
    Error,
    RegisterMutationProps
  >({
    mutationFn: async ({ user, character }) => {
      const response = await registerUser(user, character);

      if (response.status !== "success" || !response.result.playableCharacter) {
        throw new Error("REGISTER_FAILED");
      }

      return response.result;
    },

    onSuccess: (data) => {
      setAuth(data.user, data.token, data.token);

      setCharacterData(data.playableCharacter ?? {});
    },
  });

  return {
    registerAndLogin: mutation.mutateAsync,

    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
