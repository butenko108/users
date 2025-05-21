// src/features/users/graphql/hooks.ts
import { type Reference, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import type {
  AddUserResponse,
  AddUserVariables,
  DeleteUserData,
  DeleteUserVars,
  GetUsersData,
  UpdateUserResponse,
  UpdateUserVariables,
} from "../types/types";
import { ADD_USER, DELETE_USER, UPDATE_USER } from "./mutations";
import { GET_USERS } from "./queries";

export const useAddUser = (onClose: () => void) => {
  return useMutation<AddUserResponse, AddUserVariables>(ADD_USER, {
    update(cache, { data }) {
      if (!data) return;

      const cached = cache.readQuery<GetUsersData>({ query: GET_USERS }) || {
        users: [],
      };

      cache.writeQuery<GetUsersData>({
        query: GET_USERS,
        data: { users: [...cached.users, data.insert_user_one] },
      });
    },
    onCompleted: () => {
      toast.success("Пользователь успешно добавлен");
      onClose();
    },
    onError: (error) => {
      toast.error(`Ошибка при добавлении пользователя: ${error.message}`);
    },
  });
};

export const useUpdateUser = (onClose: () => void) => {
  return useMutation<UpdateUserResponse, UpdateUserVariables>(UPDATE_USER, {
    onCompleted: () => {
      toast.success("Пользователь успешно обновлен");
      onClose();
    },
    onError: (error) => {
      toast.error(`Ошибка при обновлении пользователя: ${error.message}`);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<DeleteUserData, DeleteUserVars>(DELETE_USER, {
    update(cache, { data }) {
      if (!data) return;
      const userId = data.delete_user_by_pk.id;

      cache.modify({
        fields: {
          user(
            existingUserRefs: readonly Reference[] | undefined,
            { readField },
          ) {
            const userRefs = existingUserRefs ?? [];

            return userRefs.filter(
              (userRef) => readField("id", userRef) !== userId,
            );
          },
        },
      });
    },
    onCompleted() {
      toast.success("Пользователь успешно удален");
    },
    onError(error) {
      toast.error(`Ошибка при удалении пользователя: ${error.message}`);
    },
  });
};
