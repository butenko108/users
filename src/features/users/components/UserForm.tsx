import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useAddUser, useUpdateUser } from "../graphql/hooks";
import type { User } from "../types/types";

interface UserFormInputs {
  name: string;
}

interface UserFormProps {
  user: User | null;
  onClose: () => void;
}

export const UserForm: FC<UserFormProps> = ({ user, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues: {
      name: user?.first_name || "",
    },
  });

  const [addUser] = useAddUser(onClose);
  const [updateUser] = useUpdateUser(onClose);

  const onSubmit = (data: UserFormInputs) => {
    if (user) {
      updateUser({
        variables: {
          pkColumns: { id: user.id },
          set: { first_name: data.name },
        },
      });
    } else {
      addUser({ variables: { object: { first_name: data.name } } });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {user ? "Редактировать пользователя" : "Добавить пользователя"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-left">
            <label htmlFor="name" className="block mb-1 font-medium">
              Имя
            </label>
            <input
              id="name"
              {...register("name", { required: "Имя обязательно" })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              {user ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
