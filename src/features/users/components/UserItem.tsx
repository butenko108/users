import type { FC } from "react";
import type { User } from "../types/types";

interface UserItemProps {
	user: User;
	onEdit: (user: User) => void;
	onDelete: (id: string) => void;
}

export const UserItem: FC<UserItemProps> = ({ user, onEdit, onDelete }) => {
	return (
		<li key={user.id} className="user-item">
			<span>{user.first_name}</span>
			<div className="user-actions">
				<button type="button" onClick={() => onEdit(user)}>
					Редактировать
				</button>
				<button type="button" onClick={() => onDelete(user.id)}>
					Удалить
				</button>
			</div>
		</li>
	);
};
