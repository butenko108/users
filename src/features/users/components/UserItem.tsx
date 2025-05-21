import type { FC } from "react";
import type { User } from "../types/types";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserItem: FC<UserItemProps> = ({ user, onEdit, onDelete }) => {
  return (
    <li
      key={user.id}
      className="flex justify-between items-center py-4 border-b border-gray-300"
    >
      <span>{user.first_name}</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(user)}
          className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={() => onDelete(user.id)}
          className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Удалить
        </button>
      </div>
    </li>
  );
};
